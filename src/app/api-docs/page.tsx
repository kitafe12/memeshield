import { Terminal, Code, Lock } from 'lucide-react';

export default function ApiDocsPage() {
    return (
        <main className="min-h-screen bg-black text-white pt-32 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-12">

                <div className="text-center space-y-4">
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight">
                        MemeShield <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">API</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Integrate our advanced security scanning engine directly into your trading bot or dApp.
                    </p>
                </div>

                <div className="p-8 rounded-3xl border border-white/10 bg-white/5 space-y-6 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-blue-500/20 flex items-center justify-center mx-auto mb-6">
                        <Lock className="w-8 h-8 text-blue-400" />
                    </div>
                    <h2 className="text-2xl font-bold">Private Beta Access</h2>
                    <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto">
                        The MemeShield API is currently in <strong>Closed Beta</strong>. We are working with select partners to refine our endpoints for high-frequency trading and bulk analysis.
                    </p>
                    <div className="pt-4">
                        <button disabled className="px-8 py-3 rounded-xl bg-white/10 text-muted-foreground cursor-not-allowed font-bold border border-white/5">
                            Join Waitlist (Coming Soon)
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-6 rounded-2xl border border-white/10 bg-black/40">
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <Terminal className="w-5 h-5 text-primary" /> Endpoints
                        </h3>
                        <ul className="space-y-3 text-sm text-muted-foreground font-mono">
                            <li className="flex justify-between">
                                <span>GET /v1/scan/{'{address}'}</span>
                                <span className="text-green-400">Active</span>
                            </li>
                            <li className="flex justify-between">
                                <span>GET /v1/creator/{'{address}'}</span>
                                <span className="text-yellow-400">Beta</span>
                            </li>
                            <li className="flex justify-between">
                                <span>POST /v1/bulk-scan</span>
                                <span className="text-blue-400">Planned</span>
                            </li>
                        </ul>
                    </div>

                    <div className="p-6 rounded-2xl border border-white/10 bg-black/40">
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <Code className="w-5 h-5 text-primary" /> Features
                        </h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>• Real-time Honeypot Detection</li>
                            <li>• Cross-chain Support (ETH, SOL, BASE, BSC)</li>
                            <li>• &lt; 100ms Latency</li>
                            <li>• Webhook Alerts</li>
                        </ul>
                    </div>
                </div>

            </div>
        </main>
    );
}
