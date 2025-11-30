import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { Shield } from 'lucide-react'
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MemeShield - Crypto Rug Pull Scanner",
  description: "Scan tokens for honeypots, taxes, and risks.",
};

import Footer from "@/components/Footer";

// ... (imports)

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" className="dark">
        <body className={cn(inter.className, "bg-black text-foreground min-h-screen antialiased flex flex-col")}>
          <header className="absolute top-0 left-0 w-full p-4 z-50 flex items-center justify-between">
            <a href="/" className="flex items-center gap-2 group">
              <div className="p-2 bg-white/5 rounded-lg border border-white/10 group-hover:bg-white/10 transition-colors">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <span className="font-bold text-xl tracking-tight hidden md:block">
                Meme<span className="text-primary">Shield</span>
              </span>
            </a>

            <div className="flex items-center gap-4">
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg backdrop-blur-md transition-colors font-medium text-sm border border-white/10">
                    Sign In
                  </button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <div className="flex items-center gap-4">
                  <a href="/dashboard" className="text-sm font-medium text-muted-foreground hover:text-white transition-colors">
                    Dashboard
                  </a>
                  <UserButton
                    appearance={{
                      elements: {
                        avatarBox: "w-10 h-10 border-2 border-primary/50"
                      }
                    }}
                  />
                </div>
              </SignedIn>
            </div>
          </header>
          <div className="flex-1">
            {children}
          </div>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
