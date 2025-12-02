
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log("Checking recent ScanHistory items...");
    const scans = await prisma.scanHistory.findMany({
        take: 10,
        orderBy: { createdAt: 'desc' },
    });

    console.log(`Found ${scans.length} scans.`);
    scans.forEach(scan => {
        console.log(`- ID: ${scan.id}, Token: ${scan.tokenAddress}, UserID: ${scan.userId}, Created: ${scan.createdAt}`);
    });
}

main()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
