'use client';

import { motion } from 'framer-motion';

export default function HeroIllustration() {
    return (
        <div className="relative w-full h-full min-h-[400px] flex items-center justify-center select-none pointer-events-none">
            {/* Main Glowing Orb */}
            <motion.div
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute w-64 h-64 bg-purple-600/30 rounded-full blur-[80px]"
            />

            {/* Secondary Orb */}
            <motion.div
                animate={{
                    scale: [1.1, 1, 1.1],
                    opacity: [0.3, 0.6, 0.3],
                    x: [20, -20, 20],
                    y: [-20, 20, -20],
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute w-48 h-48 bg-blue-600/30 rounded-full blur-[60px] -right-10 -top-10"
            />

            {/* Grid/Shield Effect */}
            <div className="relative z-10 w-80 h-80">
                <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                    <defs>
                        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style={{ stopColor: '#a855f7', stopOpacity: 1 }} />
                            <stop offset="100%" style={{ stopColor: '#3b82f6', stopOpacity: 1 }} />
                        </linearGradient>
                    </defs>

                    {/* Central Shield Icon Abstract */}
                    <motion.path
                        d="M100 20 L170 50 V110 C170 150 100 190 100 190 C100 190 30 150 30 110 V50 L100 20 Z"
                        fill="none"
                        stroke="url(#grad1)"
                        strokeWidth="2"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                    />

                    {/* Inner Elements */}
                    <motion.circle
                        cx="100"
                        cy="100"
                        r="30"
                        fill="none"
                        stroke="rgba(255,255,255,0.2)"
                        strokeWidth="1"
                        animate={{ r: [30, 35, 30], opacity: [0.5, 0.2, 0.5] }}
                        transition={{ duration: 3, repeat: Infinity }}
                    />

                    {/* Floating Particles */}
                    {[...Array(5)].map((_, i) => (
                        <motion.circle
                            key={i}
                            r="2"
                            fill="#fff"
                            initial={{ x: 100, y: 100, opacity: 0 }}
                            animate={{
                                x: 100 + (Math.random() * 100 - 50),
                                y: 100 + (Math.random() * 100 - 50),
                                opacity: [0, 1, 0]
                            }}
                            transition={{
                                duration: 2 + Math.random() * 2,
                                repeat: Infinity,
                                delay: Math.random() * 2
                            }}
                        />
                    ))}
                </svg>
            </div>
        </div>
    );
}
