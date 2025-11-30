import { auth, currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Shield, Clock, CheckCircle, AlertTriangle, XCircle, Crown } from "lucide-react";
import { cn } from "@/lib/utils";
import UpgradeSection from "@/components/UpgradeSection";

export default async function DashboardPage() {
    const { userId } = await auth();
    const user = await currentUser();

    if (!userId || !user) {
        redirect("/");
    }

    // Fetch user's personal history
    const history = await prisma.scanHistory.findMany({
        where: { userId: userId },
        orderBy: { createdAt: "desc" },
        take: 50,
    });

    // Fetch user's subscription status
    const subscription = await prisma.subscription.findUnique({
        where: { userId: userId },
    });
    const isPro = subscription?.status === 'active';

    return (
        <main className="min-h-screen p-8 pt-24 relative overflow-hidden">
            {/* Background */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-5xl mx-auto space-y-12">
                {/* Header */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <img
                            src={user.imageUrl}
                            alt="Profile"
                            className="w-16 h-16 rounded-full border-2 border-primary/50"
                        />
                        <div>
                            <h1 className="text-3xl font-bold">Welcome, {user.firstName}!</h1>
                            <p className="text-muted-foreground">Manage your scans and subscription.</p>
                        </div>
                    </div>



                    // ... (inside component)

                    <div className="flex items-center gap-4">
                        <div className={cn(
                            "px-4 py-2 rounded-full border flex items-center gap-2",
                            isPro ? "bg-green-500/10 border-green-500/20 text-green-400" : "bg-white/5 border-white/10"
                        )}>
                            <div className={cn("w-2 h-2 rounded-full animate-pulse", isPro ? "bg-green-500" : "bg-yellow-500")} />
                            <span className="text-sm font-medium">{isPro ? "Pro Plan Active" : "Free Plan"}</span>
                        </div>
                    </div>
                </div>

                {/* Upgrade Section (Only for Free Users) */}
                {!isPro && (
                    <UpgradeSection
                        monthlyUrl={process.env.LEMONSQUEEZY_CHECKOUT_URL}
                        yearlyUrl={process.env.LEMONSQUEEZY_ANNUAL_CHECKOUT_URL}
                    />
                )}

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatCard label="Total Scans" value={history.length.toString()} icon={<Shield className="w-6 h-6 text-primary" />} />
                    <StatCard label="Safe Tokens Found" value={history.filter(h => h.safetyScore >= 80).length.toString()} icon={<CheckCircle className="w-6 h-6 text-green-500" />} />
                    <StatCard label="Risky Tokens Found" value={history.filter(h => h.safetyScore < 50).length.toString()} icon={<AlertTriangle className="w-6 h-6 text-red-500" />} />
                </div>

                {/* History List */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <Clock className="w-6 h-6 text-primary" />
                        Your Scan History
                    </h2>

                    {history.length === 0 ? (
                        <div className="text-center py-12 bg-white/5 rounded-2xl border border-white/10">
                            <p className="text-muted-foreground">You haven't scanned any tokens yet.</p>
                        </div>
                    ) : (
                        <div className="grid gap-4">
                            {history.map((scan) => (
                                <div key={scan.id} className="glass-card p-4 rounded-xl flex items-center justify-between hover:bg-white/5 transition-colors group">
                                    <div className="flex items-center gap-4">
                                        <div className={cn(
                                            "w-10 h-10 rounded-full flex items-center justify-center",
                                            scan.safetyScore >= 80 ? "bg-green-500/20 text-green-400" :
                                                scan.safetyScore >= 50 ? "bg-yellow-500/20 text-yellow-400" :
                                                    "bg-red-500/20 text-red-400"
                                        )}>
                                            {scan.safetyScore >= 80 ? <CheckCircle className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
                                        </div>
                                        <div>
                                            <div className="font-mono text-sm text-foreground group-hover:text-primary transition-colors">
                                                {scan.tokenAddress}
                                            </div>
                                            <div className="text-xs text-muted-foreground/60 uppercase flex gap-2">
                                                <span>{new Date(scan.createdAt).toLocaleDateString()}</span>
                                                <span>•</span>
                                                <span>{scan.chainId}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={cn(
                                        "text-xl font-bold",
                                        scan.safetyScore >= 80 ? "text-green-500" :
                                            scan.safetyScore >= 50 ? "text-yellow-500" : "text-red-500"
                                    )}>
                                        {scan.safetyScore}/100
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}

function StatCard({ label, value, icon }: { label: string, value: string, icon: React.ReactNode }) {
    return (
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center gap-4">
            <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                {icon}
            </div>
            <div>
                <div className="text-sm text-muted-foreground">{label}</div>
                <div className="text-2xl font-bold">{value}</div>
            </div>
        </div>
    );
}
