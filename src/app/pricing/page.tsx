import { CheckCircle, XCircle, Zap, Infinity as InfinityIcon } from 'lucide-react';
import Link from 'next/link';
import { auth } from '@clerk/nextjs/server';

export default async function PricingPage() {
    const { userId } = await auth();

    // Helper to generate Helio Checkout URL
    const getHelioUrl = (productId: string | undefined) => {
        if (!productId) return "#";
        // Encode metadata for Helio
        const meta = encodeURIComponent(JSON.stringify({ userId: userId || "anonymous" }));
        return `https://hel.io/pay/${productId}?customMetaData=${meta}`;
    };

    return (
        <main className="min-h-screen bg-black text-white pt-32 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-16">

                {/* Header */}
                <div className="text-center space-y-4">
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight">
                        Pay with <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Solana</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Instant access. No KYC. Pure DeFi.
                    </p>
                </div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">

                    {/* Free Plan */}
                    <div className="p-8 rounded-3xl border border-white/10 bg-white/5 flex flex-col">
                        <div className="mb-8">
                            <h3 className="text-2xl font-bold mb-2">Free Starter</h3>
                            <div className="text-4xl font-black">$0<span className="text-lg font-medium text-muted-foreground">/mo</span></div>
                            <p className="text-muted-foreground mt-4">Perfect for casual traders testing the waters.</p>
                        </div>
                        <ul className="space-y-4 mb-8 flex-1">
                            <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-green-500" /> 3 Scans per day</li>
                            <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-green-500" /> Basic Safety Score</li>
                            <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-green-500" /> Honeypot Detection</li>
                            <li className="flex items-center gap-3 text-muted-foreground/50"><XCircle className="w-5 h-5" /> Sniper Status</li>
                            <li className="flex items-center gap-3 text-muted-foreground/50"><XCircle className="w-5 h-5" /> Whale Watcher</li>
                            <li className="flex items-center gap-3 text-muted-foreground/50"><XCircle className="w-5 h-5" /> Detective Mode</li>
                        </ul>
                        <Link href="/" className="w-full py-3 rounded-xl border border-white/20 hover:bg-white/10 transition-all text-center font-bold">
                            Start Scanning
                        </Link>
                    </div>

                    {/* Monthly Plan */}
                    <div className="relative p-8 rounded-3xl border border-purple-500/50 bg-purple-900/10 flex flex-col">
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                            Most Popular
                        </div>
                        <div className="mb-8">
                            <h3 className="text-2xl font-bold mb-2 text-purple-400">Pro Monthly</h3>
                            <div className="text-4xl font-black">$19.99<span className="text-lg font-medium text-muted-foreground">/mo</span></div>
                            <p className="text-muted-foreground mt-4">For serious traders who want an unfair advantage.</p>
                        </div>
                        <ul className="space-y-4 mb-8 flex-1">
                            <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-purple-400" /> Unlimited Scans</li>
                            <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-purple-400" /> Advanced Risk Analysis</li>
                            <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-purple-400" /> <span className="font-bold text-white">Sniper Status</span></li>
                            <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-purple-400" /> <span className="font-bold text-white">Whale Watcher</span></li>
                            <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-purple-400" /> <span className="font-bold text-white">Detective Mode</span></li>
                            <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-purple-400" /> Priority Support</li>
                        </ul>
                        <a
                            href={getHelioUrl(process.env.HELIO_MONTHLY_PRODUCT_ID)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-3 rounded-xl bg-primary hover:bg-primary/90 transition-all text-center font-bold shadow-lg shadow-purple-900/20 flex items-center justify-center gap-2"
                        >
                            <Zap className="w-4 h-4 fill-current" /> Subscribe with SOL
                        </a>
                    </div>

                    {/* Lifetime Plan */}
                    <div className="relative p-8 rounded-3xl border border-yellow-500/30 bg-yellow-900/10 flex flex-col">
                        <div className="mb-8">
                            <h3 className="text-2xl font-bold mb-2 text-yellow-400">Lifetime Access</h3>
                            <div className="text-4xl font-black">$199<span className="text-lg font-medium text-muted-foreground">/once</span></div>
                            <p className="text-muted-foreground mt-4">Pay once, own it forever. No recurring fees.</p>
                        </div>
                        <ul className="space-y-4 mb-8 flex-1">
                            <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-yellow-400" /> <strong>Everything in Pro</strong></li>
                            <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-yellow-400" /> Lifetime Updates</li>
                            <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-yellow-400" /> Early Access to Beta</li>
                            <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-yellow-400" /> Private Discord Role</li>
                        </ul>
                        <a
                            href={getHelioUrl(process.env.HELIO_LIFETIME_PRODUCT_ID)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-3 rounded-xl border border-yellow-500/50 hover:bg-yellow-500/10 text-yellow-400 transition-all text-center font-bold flex items-center justify-center gap-2"
                        >
                            <InfinityIcon className="w-4 h-4" /> Buy Lifetime
                        </a>
                    </div>

                </div>
            </div>
        </main>
    );
}
