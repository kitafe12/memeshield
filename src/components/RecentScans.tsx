'use client';

import { useEffect, useState } from 'react';
import { getRecentScans } from '@/app/actions';
import { ScanHistory } from '@prisma/client';
import { motion } from 'framer-motion';
import { Shield, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function RecentScans() {
    const [scans, setScans] = useState<ScanHistory[]>([]);
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        async function fetchScans() {
            const data = await getRecentScans();
            setScans(data);
        }
        fetchScans();

        // Refresh every 30 seconds
        const interval = setInterval(fetchScans, 30000);
        return () => clearInterval(interval);
    }, []);

    if (scans.length === 0) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-3xl mt-12"
        >
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Clock className="w-6 h-6 text-primary" />
                Recent Scans
            </h2>

            <div className="grid gap-4">
                {scans.slice(0, showAll ? undefined : 3).map((scan) => (
                    <div key={scan.id} className="glass-card p-4 rounded-xl flex items-center justify-between hover:bg-white/5 transition-colors">
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
                                <div className="font-mono text-sm text-muted-foreground">
                                    {scan.tokenAddress.slice(0, 6)}...{scan.tokenAddress.slice(-4)}
                                </div>
                                <div className="text-xs text-muted-foreground/60 uppercase">
                                    {scan.chainId === '1' ? 'Ethereum' :
                                        scan.chainId === '8453' ? 'Base' :
                                            scan.chainId === '56' ? 'BSC' :
                                                scan.chainId === 'solana' ? 'Solana' : 'Unknown'}
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

            {scans.length > 3 && (
                <div className="flex justify-center mt-6">
                    <button
                        onClick={() => setShowAll(!showAll)}
                        className="px-6 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-muted-foreground hover:text-white hover:bg-white/10 transition-all"
                    >
                        {showAll ? "Show Less" : "View More"}
                    </button>
                </div>
            )}
        </motion.div>
    );
}
