import { Shield, AlertTriangle, Printer, Lock, DollarSign, Crosshair, Eye, Search } from "lucide-react";

export default function SecurityGuide() {
    return (
        <section className="py-20 px-4 relative overflow-hidden">
            <div className="max-w-5xl mx-auto space-y-12">
                <div className="text-center space-y-4">
                    <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                        Understanding the Risks
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Don't get rugged. Here is what our security score analyzes to keep you safe.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <GuideCard
                        icon={<AlertTriangle className="w-6 h-6 text-red-500" />}
                        title="Honeypot"
                        description="A trap where you can buy a token but cannot sell it. The contract code intentionally prevents selling, locking your funds forever."
                        risk="Critical"
                    />

                    <GuideCard
                        icon={<Crosshair className="w-6 h-6 text-blue-400" />}
                        title="Sniper Status"
                        description="Indicates if a token is safe to buy instantly. Checks for honeypots, trading pauses, and high taxes that would trap a quick trade."
                        risk="Entry Signal"
                    />

                    <GuideCard
                        icon={<Eye className="w-6 h-6 text-emerald-400" />}
                        title="Whale Watcher"
                        description="Monitors the top holders. If a few wallets hold most of the supply, they can crash the price by selling everything at once."
                        risk="High Volatility"
                    />

                    <GuideCard
                        icon={<Search className="w-6 h-6 text-purple-400" />}
                        title="Creator Reputation"
                        description="Analyzes the developer's history. If they have deployed scams before or renounced ownership, it helps predict their future actions."
                        risk="Medium"
                    />

                    <GuideCard
                        icon={<DollarSign className="w-6 h-6 text-yellow-500" />}
                        title="Buy/Sell Taxes"
                        description="Fees taken by the creator on every trade. High taxes (e.g., 99%) are a common scam tactic to drain your investment."
                        risk="High if > 10%"
                    />

                    <GuideCard
                        icon={<Printer className="w-6 h-6 text-orange-500" />}
                        title="Mintable"
                        description="The creator can print unlimited new tokens. This dilutes the value of your holdings to near zero instantly."
                        risk="High"
                    />
                </div>
            </div>
        </section>
    );
}

function GuideCard({ icon, title, description, risk }: { icon: React.ReactNode, title: string, description: string, risk: string }) {
    return (
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
            <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                    {icon}
                </div>
                <div className="space-y-2">
                    <h3 className="text-xl font-bold">{title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                        {description}
                    </p>
                    <div className="pt-2">
                        <span className="text-xs font-mono px-2 py-1 rounded-md bg-white/5 border border-white/10 text-white/70">
                            Risk Impact: {risk}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
