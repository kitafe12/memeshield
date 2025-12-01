import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const headersList = await headers();
        const authHeader = headersList.get('authorization');

        // 1. Security Check: Verify API Key
        if (authHeader !== `Bearer ${process.env.HELIO_API_KEY}`) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const event = body;

        // 2. Filter for Successful Payments
        if (event.transactionStatus !== 'SUCCESS') {
            return NextResponse.json({ message: 'Transaction not successful, ignoring' }, { status: 200 });
        }

        // 3. Extract User ID and Product Info
        // Helio passes custom data in "meta" or "customMetaData"
        const userId = event.meta?.userId || event.customMetaData?.userId;
        const productId = event.pricing?.product?.id; // Adjust based on actual Helio payload structure

        if (!userId) {
            console.error('Missing userId in Helio webhook payload');
            return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
        }

        // 4. Update User in Database
        const isLifetime = productId === process.env.HELIO_LIFETIME_PRODUCT_ID;
        const isMonthly = productId === process.env.HELIO_MONTHLY_PRODUCT_ID;

        let updateData: any = {
            isPro: true,
            subscriptionId: event.id, // Store transaction/subscription ID
            updatedAt: new Date(),
        };

        if (isLifetime) {
            updateData.planType = 'LIFETIME';
            updateData.periodEnd = null; // No expiration
        } else if (isMonthly) {
            updateData.planType = 'MONTHLY';
            // Set expiration to 30 days from now
            const expirationDate = new Date();
            expirationDate.setDate(expirationDate.getDate() + 30);
            updateData.periodEnd = expirationDate;
        } else {
            console.warn(`Unknown product ID: ${productId}`);
            // Default to monthly if unknown, or handle error? 
            // For now, let's assume it's a valid pro upgrade if it hit this webhook
            updateData.planType = 'UNKNOWN_PRO';
        }

        await prisma.user.upsert({
            where: { userId: userId },
            update: updateData,
            create: {
                userId: userId,
                email: event.customerDetails?.email || undefined,
                ...updateData
            },
        });

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error('Error processing Helio webhook:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
