import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log("Testing Database Connection...");
    try {
        const user = await prisma.scanHistory.create({
            data: {
                tokenAddress: "0xTest",
                chainId: "1",
                safetyScore: 100,
                redFlags: "[]",
                rawJson: "{}",
            }
        })
        console.log("DB Write Success:", user.id);
    } catch (e) {
        console.error("DB Write Failed:", e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
