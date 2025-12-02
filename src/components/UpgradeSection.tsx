'use client';

import { useState } from 'react';
import { Crown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface UpgradeSectionProps {
    monthlyUrl?: string;
    yearlyUrl?: string;
}

export default function UpgradeSection({ monthlyUrl = "#" }: UpgradeSectionProps) {
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
                    {/* Price & Button */}
                    <div className="flex items-center gap-4">
                        <div className="text-right hidden sm:block">
                            <div className="text-2xl font-bold">
                                $19.99
                                <span className="text-sm font-normal text-muted-foreground">/mo</span>
                            </div>
                            <div className="text-xs text-muted-foreground font-medium text-yellow-500/80">
                                or $199 Lifetime
                            </div>
                        </div>
                        <a
                            href={monthlyUrl}
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
