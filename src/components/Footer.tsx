import { Shield, Twitter, Send, MessageCircle } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="border-t border-white/10 bg-black py-12 mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <Shield className="w-6 h-6 text-primary" />
                            <span className="font-bold text-xl tracking-tight text-white">
                                Meme<span className="text-primary">Shield</span>
                            </span>
                        </div>
                        <p className="text-muted-foreground text-sm max-w-xs leading-relaxed">
                            The advanced crypto security scanner for degens.
                            Detect honeypots, rugs, and scams before you buy.
                        </p>
                    </div>

                    {/* Product */}
                    <div>
                        <h3 className="font-bold text-white mb-4">Product</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><a href="/" className="hover:text-primary transition-colors">Scanner</a></li>
                            <li><a href="/pricing" className="hover:text-primary transition-colors">Pricing</a></li>
                            <li><a href="/api-docs" className="hover:text-primary transition-colors">API</a></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="font-bold text-white mb-4">Legal</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><a href="/terms" className="hover:text-primary transition-colors">Terms of Service</a></li>
                            <li><a href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                            <li><a href="/disclaimer" className="hover:text-primary transition-colors">Disclaimer</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-muted-foreground">
                        © {new Date().getFullYear()} MemeShield. All rights reserved.
                    </p>

                    <div className="flex items-center gap-4">
                        <a href="https://x.com/memeshield_sol" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                            <Twitter className="w-5 h-5" />
                        </a>
                        <a href="https://t.me/memeshield_portal" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                            <Send className="w-5 h-5" />
                        </a>
                        <a href="https://discord.gg/memeshield" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                            <MessageCircle className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
