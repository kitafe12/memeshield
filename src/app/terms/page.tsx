export default function TermsPage() {
    return (
        <main className="min-h-screen bg-black text-white pt-32 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto space-y-8">
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                    Terms of Service
                </h1>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                    <p>Last updated: {new Date().toLocaleDateString()}</p>

                    <h2 className="text-2xl font-semibold text-white mt-8">1. Acceptance of Terms</h2>
                    <p>
                        By accessing and using MemeShield ("the Service"), you agree to be bound by these Terms of Service.
                        If you do not agree to these terms, please do not use the Service.
                    </p>

                    <h2 className="text-2xl font-semibold text-white mt-8">2. Description of Service</h2>
                    <p>
                        MemeShield provides analysis tools for cryptocurrency tokens. The Service is for informational purposes only
                        and does not constitute financial advice. We do not guarantee the accuracy of any data provided.
                    </p>

                    <h2 className="text-2xl font-semibold text-white mt-8">3. Risk Disclosure</h2>
                    <p>
                        Cryptocurrency trading involves substantial risk of loss. You acknowledge that you are solely responsible
                        for your investment decisions. MemeShield is not responsible for any financial losses you may incur.
                    </p>

                    <h2 className="text-2xl font-semibold text-white mt-8">4. Pro Subscriptions</h2>
                    <p>
                        Pro features are available via subscription. Payments are processed securely through Lemon Squeezy.
                        Refunds are handled according to our refund policy.
                    </p>
                </div>
            </div>
        </main>
    );
}
