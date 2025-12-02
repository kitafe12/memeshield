import { cookies } from 'next/headers';
import ScannerDashboard from '@/components/ScannerDashboard';

import SecurityGuide from '@/components/SecurityGuide';

import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';

export default async function Home() {
  const cookieStore = await cookies();
  const scansCookie = cookieStore.get('daily_scans');
  const initialScansUsed = scansCookie ? parseInt(scansCookie.value) : 0;

  // Fetch User & Subscription Status
  const { userId } = await auth();
  let isPro = false;

  if (userId) {
    try {
      const user = await prisma.user.findUnique({
        where: { userId },
      });
      isPro = user?.isPro || false;
    } catch (error) {
      console.error("Home Page DB Error:", error);
      // Fail silently and treat as free user
    }
  }

  return (
    <main>
      <ScannerDashboard initialScansUsed={initialScansUsed} isPro={isPro} />
      <SecurityGuide />
    </main>
  );
}
