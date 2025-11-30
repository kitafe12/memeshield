'use client';

import { useState } from 'react';
import { Crown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface UpgradeSectionProps {
    monthlyUrl?: string;
    yearlyUrl?: string;
}

export default function UpgradeSection({ monthlyUrl = "#", yearlyUrl = "#" }: UpgradeSectionProps) {
    const [isAnnual, setIsAnnual] = useState(true);

    return (
        <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-32 bg-primary/5 rounded-full blur-[80px] -mr-16 -mt-16" />

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                    <h3 className="text-xl font-bold flex items-center gap-2">
                        <Crown className="w-5 h-5 text-yellow-500" />
                        Upgrade to Pro
                    </h3>
                    <p className="text-muted-foreground mt-1 max-w-md">
                        Get unlimited scans, sniper alerts, and access to Detective Mode to spot serial scammers.
                    </p>
                </div>

                <div className="flex flex-col items-end gap-4">
                    {/* Toggle */}
                    <div className="flex items-center gap-1 bg-black/40 p-1 rounded-full border border-white/5">
                        <button
                            onClick={() => setIsAnnual(false)}
                            className={cn(
                                "px-4 py-1.5 rounded-full text-sm font-medium transition-all",
                                !isAnnual ? "bg-white/10 text-white shadow-sm" : "text-muted-foreground hover:text-white"
                            )}
                        >
                            Monthly
                        </button>
                        <button
                            onClick={() => setIsAnnual(true)}
                            className={cn(
                                "px-4 py-1.5 rounded-full text-sm font-medium transition-all flex items-center gap-2",
                                isAnnual ? "bg-primary text-white shadow-sm" : "text-muted-foreground hover:text-white"
                            )}
                        >
                            Yearly <span className="text-[10px] bg-green-500/20 text-green-400 px-1.5 py-0.5 rounded border border-green-500/20">SAVE 17%</span>
                        </button>
                    </div>

                    {/* Price & Button */}
                    <div className="flex items-center gap-4">
                        <div className="text-right hidden sm:block">
                            <div className="text-2xl font-bold">
                                {isAnnual ? "99€" : "9.99€"}
                                <span className="text-sm font-normal text-muted-foreground">/{isAnnual ? "yr" : "mo"}</span>
                            </div>
                        </div>
                        <a
                            href={isAnnual ? yearlyUrl : monthlyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black font-bold rounded-xl transition-all shadow-lg flex items-center gap-2"
                        >
                            Upgrade Now
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
