'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const faqs = [
    {
        question: "Is MemeShield free to use?",
        answer: "Yes! You get 3 free scans per day. For unlimited scans and advanced features like Sniper Status and Whale Watcher, you can upgrade to our Pro plan."
    },
    {
        question: "Which chains do you support?",
        answer: "We currently support Ethereum (ETH), Binance Smart Chain (BSC), Base, and Solana. We are constantly adding more chains."
    },
    {
        question: "How accurate is the Safety Score?",
        answer: "Our score is calculated using real-time data from GoPlus Security and DexScreener. While we detect most known scams (honeypots, high taxes), always do your own research (DYOR) as scammers are constantly evolving."
    },
    {
        question: "What is 'Paranoid Mode'?",
        answer: "Paranoid Mode is our strict scoring algorithm designed for degens. It heavily penalizes any red flag (like mintable tokens or hidden owners) to keep you extra safe."
    }
];

export default function FAQ() {
    return (
        <section className="py-12 md:py-20 w-full max-w-3xl mx-auto">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
                <p className="text-muted-foreground">Everything you need to know about MemeShield.</p>
            </div>

            <div className="space-y-4">
                {faqs.map((faq, index) => (
                    <FAQItem key={index} question={faq.question} answer={faq.answer} />
                ))}
            </div>
        </section>
    );
}

function FAQItem({ question, answer }: { question: string, answer: string }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border border-white/10 rounded-2xl bg-white/5 overflow-hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
            >
                <span className="font-semibold text-lg">{question}</span>
                <ChevronDown className={cn("w-5 h-5 transition-transform duration-300", isOpen && "rotate-180")} />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="px-6 pb-6 text-muted-foreground leading-relaxed border-t border-white/5 pt-4">
                            {answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
