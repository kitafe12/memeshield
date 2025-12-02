
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
});

async function main() {
    console.log("--- DIAGNOSTIC START ---");

    try {
        // 1. Check Connection
        console.log("1. Testing Connection...");
        const count = await prisma.scanHistory.count();
        console.log(`✅ Connection successful. Total scan history items: ${count}`);

        // 2. Test Write
        console.log("2. Testing Write...");
        const testId = "test_user_" + Date.now();
        const newScan = await prisma.scanHistory.create({
            data: {
                tokenAddress: "So11111111111111111111111111111111111111112",
                chainId: "solana",
                safetyScore: 99,
                rawJson: "{}",
                redFlags: "[]",
                userId: testId
            }
        });
        console.log("✅ Write successful. Created item with ID:", newScan.id);

        // 3. Test Read
        console.log("3. Testing Read (by userId)...");
        const foundScans = await prisma.scanHistory.findMany({
            where: { userId: testId }
        });

        if (foundScans.length > 0) {
            console.log(`✅ Read successful. Found ${foundScans.length} items for user ${testId}.`);
        } else {
            console.error("❌ Read failed. Could not find the item we just created.");
        }

        // 4. Clean up
        console.log("4. Cleaning up...");
        await prisma.scanHistory.delete({
            where: { id: newScan.id }
        });
        console.log("✅ Cleanup successful.");

    } catch (error) {
        console.error("❌ DIAGNOSTIC FAILED:", error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
