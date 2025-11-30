'use server'

import { fetchTokenSecurity } from "@/lib/scanner";
import { cookies } from 'next/headers';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import prisma from "@/lib/prisma";

export async function scanToken(formData: FormData) {
  const address = formData.get("address") as string;
  const chainId = formData.get("chainId") as string || "1";

  console.log("--- SCAN START ---");
  console.log("Address:", address);
  console.log("ChainId:", chainId);

  // 0. Enforce Authentication
  const { userId } = await auth();
  if (!userId) {
    redirect('/sign-in');
  }

  // 1. Check Rate Limit (Cookie-based)
  const cookieStore = await cookies();
  const scansCookie = cookieStore.get('daily_scans');
  const scansCount = scansCookie ? parseInt(scansCookie.value) : 0;
  const FREE_LIMIT = 100; // Increased for testing

  if (scansCount >= FREE_LIMIT) {
    console.log("Limit reached");
    return { error: `Daily limit reached (${FREE_LIMIT}/${FREE_LIMIT}). Upgrade to Pro for unlimited scans.` };
  }

  if (!address) {
    console.log("Error: Address missing");
    return { error: "Address is required" };
  }

  try {
    // 2. Perform Scan
    console.log("Fetching token security...");
    const result = await fetchTokenSecurity(chainId, address);
    console.log("Scan Result:", result ? "Found" : "Null");

    // 3. Increment Scan Count
    const oneDay = 24 * 60 * 60 * 1000;
    cookieStore.set('daily_scans', (scansCount + 1).toString(), { expires: Date.now() + oneDay });

    // 4. Save to History
    try {
      console.log("Saving to DB...");

      await prisma.scanHistory.create({
        data: {
          tokenAddress: address,
          chainId: chainId,
          safetyScore: result.score,
          redFlags: JSON.stringify(result.redFlags),
          rawJson: JSON.stringify(result.details),
          userId: userId || null, // Save userId
        }
      });
      console.log("Saved to DB.");
    } catch (dbError) {
      console.error("DB Save Failed (Non-fatal):", dbError);
    }

    return { success: true, data: result };
  } catch (error) {
    console.error("Scan failed:", error);
    return { error: error instanceof Error ? error.message : "Failed to scan token" };
  }
}

export async function getRecentScans() {
  try {
    const scans = await prisma.scanHistory.findMany({
      take: 10,
      orderBy: {
        createdAt: 'desc',
      },
    });
    return scans;
  } catch (error) {
    console.error("Failed to fetch recent scans:", error);
    return [];
  }
}
