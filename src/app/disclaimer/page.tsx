export default function DisclaimerPage() {
    return (
        <main className="min-h-screen bg-black text-white pt-32 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto space-y-8">
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                    Disclaimer
                </h1>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                    <p>Last updated: {new Date().toLocaleDateString()}</p>

                    <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-2xl">
                        <h2 className="text-xl font-bold text-red-400 mb-4">Not Financial Advice</h2>
                        <p className="text-red-200/80">
                            The content provided by MemeShield is for informational and educational purposes only.
                            Nothing contained herein shall constitute a solicitation, recommendation, endorsement,
                            or offer by MemeShield or any third party service provider to buy or sell any securities
                            or other financial instruments.
                        </p>
                    </div>

                    <h2 className="text-2xl font-semibold text-white mt-8">No Warranties</h2>
                    <p>
                        The Service is provided on an "as is" and "as available" basis. We make no warranties, expressed or implied,
                        regarding the accuracy, reliability, or completeness of any data provided.
                    </p>

                    <h2 className="text-2xl font-semibold text-white mt-8">Do Your Own Research (DYOR)</h2>
                    <p>
                        Cryptocurrency markets are highly volatile and risky. You should always conduct your own due diligence
                        before making any investment decisions. Never invest money you cannot afford to lose.
                    </p>
                </div>
            </div>
        </main>
    );
}
