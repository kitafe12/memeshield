import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
    try {
        const text = await req.text();
        const hmac = crypto.createHmac("sha256", process.env.LEMONSQUEEZY_WEBHOOK_SECRET || "");
        const digest = Buffer.from(hmac.update(text).digest("hex"), "utf8");
        const signature = Buffer.from(req.headers.get("x-signature") || "", "utf8");

        if (!crypto.timingSafeEqual(digest, signature)) {
            return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
        }

        const payload = JSON.parse(text);
        const eventName = payload.meta.event_name;
        const data = payload.data;
        const attributes = data.attributes;

        // Assuming custom_data contains userId (we need to pass this in checkout)
        // Or we can match by email if Clerk email matches Lemon Squeezy email
        const userId = payload.meta.custom_data?.user_id;

        if (!userId) {
            console.log("No user_id in custom_data");
            // Fallback: Try to find user by email (optional, but risky if emails differ)
            return NextResponse.json({ message: "No user_id found" }, { status: 200 });
        }

        if (eventName === "subscription_created" || eventName === "subscription_updated") {
            await prisma.subscription.upsert({
                where: { userId: userId },
                update: {
                    lemonSqueezyId: data.id,
                    status: attributes.status,
                    renewsAt: new Date(attributes.renews_at),
                },
                create: {
                    userId: userId,
                    lemonSqueezyId: data.id,
                    status: attributes.status,
                    renewsAt: new Date(attributes.renews_at),
                },
            });
        } else if (eventName === "subscription_cancelled") {
            await prisma.subscription.update({
                where: { userId: userId },
                data: { status: "cancelled" },
            });
        }

        return NextResponse.json({ received: true });
    } catch (error) {
        console.error("Webhook error:", error);
        return NextResponse.json({ error: "Webhook failed" }, { status: 500 });
    }
}
