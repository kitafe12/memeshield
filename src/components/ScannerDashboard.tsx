'use client';

import { useState } from 'react';
import { scanToken } from '@/app/actions';
import { ScanResult } from '@/lib/scanner';
import { Shield, Search, AlertTriangle, CheckCircle, XCircle, Crosshair, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import RecentScans from './RecentScans';
import HeroIllustration from './HeroIllustration';
import FAQ from './FAQ';

interface ScannerDashboardProps {
    initialScansUsed: number;
    isPro: boolean;
}

export default function ScannerDashboard({ initialScansUsed, isPro }: ScannerDashboardProps) {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<ScanResult | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [scansUsed, setScansUsed] = useState(initialScansUsed);
    const [currentChain, setCurrentChain] = useState("1");

    async function handleSubmit(formData: FormData) {
        console.log("Submitting form...");
        const chainId = formData.get('chainId') as string;
        setCurrentChain(chainId);

        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const response = await scanToken(formData);
            console.log("Response:", response);

            if (response.error) {
                setError(response.error);
            } else if (response.data) {
                setResult(response.data);
                // Optimistically update scan count
                setScansUsed(prev => Math.min(prev + 1, 3));
            }

        } catch (e) {
            console.error("Submission error:", e);
            setError("An unexpected error occurred.");
        }

        setLoading(false);
    }

    return (
        <main className="min-h-screen relative overflow-hidden bg-black text-white selection:bg-primary/30">
            {/* Background Gradients */}
            <div className="fixed inset-0 -z-10 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-900/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-900/20 rounded-full blur-[120px]" />
                <div className="absolute top-[20%] right-[20%] w-[30%] h-[30%] bg-pink-900/10 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-12 md:py-20 space-y-16 md:space-y-24">

                {/* HERO SECTION */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left: Text & Search */}
                    <div className="space-y-8 text-center lg:text-left z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-sm font-medium text-primary/80"
                        >
                            <Shield className="w-4 h-4" />
                            <span>The #1 Anti-Rug Tool for Degens</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tight leading-tight"
                        >
                            Scan. <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Snipe.</span> <br />
                            Stay Safe.
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed"
                        >
                            Detect honeypots, high taxes, and hidden risks in seconds.
                            Don't let scammers drain your wallet.
                        </motion.p>

                        {/* Search Bar Container */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="w-full max-w-lg mx-auto lg:mx-0"
                        >
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
                                <form action={handleSubmit} className="relative z-10 bg-black/80 border border-white/10 rounded-2xl p-2 flex flex-col sm:flex-row gap-2 backdrop-blur-xl shadow-2xl">
                                    {/* Chain Select */}
                                    <div className="relative sm:w-1/3">
                                        <select
                                            name="chainId"
                                            className="w-full h-full py-3 px-4 bg-white/5 border border-white/5 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-primary/50 appearance-none cursor-pointer hover:bg-white/10 transition-colors"
                                            defaultValue="1"
                                        >
                                            <option value="1" className="bg-black">Ethereum</option>
                                            <option value="8453" className="bg-black">Base</option>
                                            <option value="56" className="bg-black">BSC</option>
                                            <option value="solana" className="bg-black">Solana</option>
                                        </select>
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground text-xs">▼</div>
                                    </div>

                                    {/* Input */}
                                    <div className="relative flex-1">
                                        <input
                                            name="address"
                                            type="text"
                                            placeholder="Token Address..."
                                            className="w-full h-full py-3 px-4 bg-transparent border-none text-base focus:outline-none placeholder:text-muted-foreground/50"
                                            required
                                        />
                                    </div>

                                    {/* Button */}
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                                    >
                                        {loading ? '...' : 'Scan'}
                                    </button>
                                </form>
                            </div>

                            {/* Limit Badge */}
                            <div className="mt-3 flex items-center justify-center lg:justify-start gap-2 text-xs text-muted-foreground">
                                <div className={cn("w-2 h-2 rounded-full", scansUsed >= 100 ? "bg-red-500" : "bg-green-500")} />
                                {scansUsed >= 3 ? "Daily Limit Reached" : `${3 - scansUsed} free scans remaining`}
                            </div>
                        </motion.div>
                    </div>

                    {/* Right: Illustration */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 }}
                        className="hidden lg:block relative h-[500px]"
                    >
                        <HeroIllustration />
                    </motion.div>
                </div>

                {/* RESULTS SECTION (Conditional) */}
                <AnimatePresence>
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="w-full max-w-4xl mx-auto"
                        >
                            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-center font-medium">
                                {error}
                            </div>
                        </motion.div>
                    )}

                    {result && (
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -40 }}
                            className="w-full space-y-8 scroll-mt-24"
                            id="results"
                        >
                            <div className="flex items-center gap-4 mb-8">
                                <div className="h-px flex-1 bg-white/10" />
                                <span className="text-muted-foreground font-mono text-sm uppercase tracking-widest">Scan Results</span>
                                <div className="h-px flex-1 bg-white/10" />
                            </div>

                            {/* Main Result Card */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                {/* Left Column: Score & Summary */}
                                <div className="lg:col-span-1 space-y-6">
                                    <div className="glass-card p-8 rounded-3xl relative overflow-hidden border border-white/10 bg-white/5">
                                        <div className="text-center space-y-4 relative z-10">
                                            <h2 className="text-lg font-medium text-muted-foreground uppercase tracking-wider">Safety Score</h2>
                                            <div className={cn(
                                                "text-7xl font-black tracking-tighter",
                                                result.score >= 80 ? "text-green-500" :
                                                    result.score >= 50 ? "text-yellow-500" : "text-red-500"
                                            )}>
                                                {result.score}
                                            </div>
                                            <div className={cn(
                                                "inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider",
                                                result.riskLevel === 'SAFE' ? "bg-green-500/20 text-green-400" :
                                                    result.riskLevel === 'CAUTION' ? "bg-yellow-500/20 text-yellow-400" :
                                                        "bg-red-500/20 text-red-400"
                                            )}>
                                                {result.riskLevel === 'SAFE' ? <CheckCircle className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                                                {result.riskLevel}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Summary Box */}
                                    <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm">
                                        <h3 className="text-primary font-bold uppercase tracking-wider text-xs mb-3">Summary</h3>
                                        <p className="text-sm leading-relaxed text-foreground/90">
                                            {result.summary}
                                        </p>
                                    </div>
                                </div>

                                {/* Right Column: Details & Pro Features */}
                                <div className="lg:col-span-2 space-y-6">
                                    {/* Quick Stats Grid */}
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                        <DetailCard label="Buy Tax" value={`${result.details.buyTax}%`} />
                                        <DetailCard label="Sell Tax" value={`${result.details.sellTax}%`} />
                                        <DetailCard label="Honeypot" value={result.details.isHoneypot ? "YES" : "NO"} danger={result.details.isHoneypot} />
                                        <DetailCard label="Mintable" value={result.details.isMintable ? "YES" : "NO"} danger={result.details.isMintable} />
                                        <DetailCard label="Market Cap" value={result.details.marketCap ? `$${(result.details.marketCap / 1000).toFixed(1)}k` : "N/A"} />
                                        <DetailCard label="Liquidity" value={result.details.liquidity ? `$${(result.details.liquidity / 1000).toFixed(1)}k` : "N/A"} danger={result.details.liquidity ? result.details.liquidity < 1000 : false} />
                                        <DetailCard label="Volume (24h)" value={result.details.volume24h ? `$${(result.details.volume24h / 1000).toFixed(1)}k` : "N/A"} />
                                        <DetailCard label="Holders" value={result.details.holders ? result.details.holders.length.toString() : "N/A"} />
                                    </div>

                                    {/* PRO FEATURES (Gated) */}
                                    <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-white/5 p-1">
                                        {!isPro && (
                                            <div className="absolute inset-0 z-20 backdrop-blur-md bg-black/60 flex flex-col items-center justify-center text-center p-6">
                                                <Shield className="w-12 h-12 text-purple-500 mb-4" />
                                                <h3 className="text-2xl font-bold text-white mb-2">Pro Features Locked</h3>
                                                <p className="text-muted-foreground mb-6 max-w-sm">
                                                    Unlock Sniper Status, Whale Watcher, and Detective Mode to trade with an unfair advantage.
                                                </p>
                                                <a href="/dashboard" className="px-8 py-3 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold transition-all shadow-lg">
                                                    Upgrade to Unlock
                                                </a>
                                            </div>
                                        )}

                                        <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-4 p-4", !isPro && "opacity-20 blur-sm pointer-events-none")}>
                                            {/* Sniper Status */}
                                            <div className="p-6 rounded-2xl bg-blue-500/5 border border-blue-500/10">
                                                <h3 className="text-blue-200 font-semibold flex items-center gap-2 mb-4">
                                                    <Crosshair className="w-5 h-5" /> Sniper Status
                                                </h3>
                                                {result.details.isHoneypot || result.details.transferPause ? (
                                                    <div className="text-red-400 font-bold text-lg">⛔ DO NOT SNIPE</div>
                                                ) : (
                                                    <div className="text-green-400 font-bold text-lg">✅ READY TO SNIPE</div>
                                                )}
                                            </div>

                                            {/* Detective Mode */}
                                            <div className="p-6 rounded-2xl bg-purple-500/5 border border-purple-500/10">
                                                <h3 className="text-purple-200 font-semibold flex items-center gap-2 mb-4">
                                                    <Search className="w-5 h-5" /> Detective Mode
                                                </h3>
                                                <div className="text-sm text-muted-foreground">
                                                    Creator: <span className="text-foreground font-mono">{result.details.ownerAddress?.slice(0, 6)}...</span>
                                                </div>
                                            </div>

                                            {/* Whale Watcher (Full Width) */}
                                            <div className="md:col-span-2 p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/10">
                                                <h3 className="text-emerald-200 font-semibold flex items-center gap-2 mb-4">
                                                    <Eye className="w-5 h-5" /> Whale Watcher
                                                </h3>
                                                <div className="space-y-2">
                                                    {result.details.holders?.slice(0, 3).map((h, i) => (
                                                        <div key={i} className="flex justify-between text-sm">
                                                            <span className="text-muted-foreground">#{i + 1} {h.address.slice(0, 6)}...</span>
                                                            <span className="text-emerald-400 font-mono">
                                                                {((parseFloat(h.balance) / parseFloat(result.details.totalSupply || "1")) * 100).toFixed(2)}%
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Chart Section */}
                            {result.details.pairAddress && (
                                <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl h-[600px] bg-black/40">
                                    <iframe
                                        src={`https://dexscreener.com/solana/${result.details.pairAddress}?embed=1&theme=dark&trades=0&info=0`}
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        title="DexScreener Chart"
                                    />
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* FEATURES GRID (Only visible when no result) */}
                {!result && (
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    >
                        <FeatureCard
                            icon={<Crosshair className="w-8 h-8 text-blue-400" />}
                            title="Sniper Check"
                            description="Instantly verify if a token is safe to snipe. Check for honeypots, transfer pauses, and high taxes."
                        />
                        <FeatureCard
                            icon={<Eye className="w-8 h-8 text-emerald-400" />}
                            title="Whale Watcher"
                            description="Analyze top holders and detect wallet clustering. Avoid getting dumped on by insiders."
                        />
                        <FeatureCard
                            icon={<Search className="w-8 h-8 text-purple-400" />}
                            title="Detective Mode"
                            description="Investigate the creator's history. See past rugs and reputation score."
                        />
                    </motion.div>
                )}

                <RecentScans />

                <FAQ />
            </div>
        </main>
    );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
    return (
        <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group">
            <div className="mb-6 p-4 bg-black/40 rounded-2xl w-fit group-hover:scale-110 transition-transform">
                {icon}
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
            <p className="text-muted-foreground leading-relaxed">
                {description}
            </p>
        </div>
    );
}

function DetailCard({ label, value, subValue, danger }: { label: string, value: string, subValue?: string, danger?: boolean }) {
    return (
        <div className={cn(
            "p-4 rounded-xl border backdrop-blur-md text-center",
            danger ? "bg-red-500/10 border-red-500/20" : "bg-white/5 border-white/5"
        )}>
            <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{label}</div>
            <div className={cn("text-xl font-bold", danger ? "text-red-400" : "text-foreground")}>
                {subValue || value}
            </div>
        </div>
    );
}
