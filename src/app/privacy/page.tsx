export default function PrivacyPage() {
    return (
        <main className="min-h-screen bg-black text-white pt-32 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto space-y-8">
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                    Privacy Policy
                </h1>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                    <p>Last updated: {new Date().toLocaleDateString()}</p>

                    <h2 className="text-2xl font-semibold text-white mt-8">1. Information We Collect</h2>
                    <p>
                        We collect information you provide directly to us, such as when you create an account, subscribe to our newsletter,
                        or contact us for support. This may include your email address and usage data.
                    </p>

                    <h2 className="text-2xl font-semibold text-white mt-8">2. How We Use Your Information</h2>
                    <p>
                        We use the information we collect to provide, maintain, and improve our services, to process your transactions,
                        and to communicate with you about news and updates.
                    </p>

                    <h2 className="text-2xl font-semibold text-white mt-8">3. Cookies and Tracking</h2>
                    <p>
                        We use cookies to improve your experience on our site. We may also use third-party analytics tools
                        to understand how our service is used.
                    </p>

                    <h2 className="text-2xl font-semibold text-white mt-8">4. Data Security</h2>
                    <p>
                        We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access,
                        disclosure, alteration and destruction.
                    </p>
                </div>
            </div>
        </main>
    );
}
