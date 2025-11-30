import { CheckCircle, XCircle, Zap } from 'lucide-react';
import Link from 'next/link';

export default function PricingPage() {
    return (
        <main className="min-h-screen bg-black text-white pt-32 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-16">

                {/* Header */}
                <div className="text-center space-y-4">
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight">
                        Simple, Transparent <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Pricing</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Choose the plan that fits your trading style. Stop getting rugged today.
                    </p>
                </div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">

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

                    {/* Pro Plan */}
                    <div className="relative p-8 rounded-3xl border border-purple-500/50 bg-purple-900/10 flex flex-col">
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                            Most Popular
                        </div>
                        <div className="mb-8">
                            <h3 className="text-2xl font-bold mb-2 text-purple-400">Pro Degen</h3>
                            <div className="text-4xl font-black">$49<span className="text-lg font-medium text-muted-foreground">/mo</span></div>
                            <p className="text-muted-foreground mt-4">For serious traders who want an unfair advantage.</p>
                        </div>
                        <ul className="space-y-4 mb-8 flex-1">
                            <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-purple-400" /> Unlimited Scans</li>
                            <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-purple-400" /> Advanced Risk Analysis</li>
                            <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-purple-400" /> <span className="font-bold text-white">Sniper Status</span> (Live Trading Check)</li>
                            <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-purple-400" /> <span className="font-bold text-white">Whale Watcher</span> (Holder Analysis)</li>
                            <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-purple-400" /> <span className="font-bold text-white">Detective Mode</span> (Creator History)</li>
                            <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-purple-400" /> Priority Support</li>
                        </ul>
                        <a
                            href={process.env.LEMONSQUEEZY_CHECKOUT_URL || "#"}
                            className="w-full py-3 rounded-xl bg-primary hover:bg-primary/90 transition-all text-center font-bold shadow-lg shadow-purple-900/20 flex items-center justify-center gap-2"
                        >
                            <Zap className="w-4 h-4 fill-current" /> Get Pro Access
                        </a>
                    </div>

                </div>
            </div>
        </main>
    );
}
