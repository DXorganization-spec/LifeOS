"use client";

import { motion } from "framer-motion";

interface CardSkeletonProps {
    count?: number;
}

export default function CardSkeleton({ count = 1 }: CardSkeletonProps) {
    return (
        <>
            {Array.from({ length: count }).map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    style={{
                        background: "#111827",
                        padding: "20px",
                        borderRadius: "16px",
                        border: "1px solid #374151",
                        boxSizing: "border-box",
                    }}
                >
                    <div
                        style={{
                            height: "16px",
                            background: "linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)",
                            backgroundSize: "200% 100%",
                            borderRadius: "4px",
                            marginBottom: "16px",
                            animation: "shimmer 2s infinite",
                        }}
                    />
                    <div
                        style={{
                            height: "32px",
                            background: "linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)",
                            backgroundSize: "200% 100%",
                            borderRadius: "4px",
                            animation: "shimmer 2s infinite",
                        }}
                    />
                    <style>{`
                        @keyframes shimmer {
                            0% { background-position: 200% 0; }
                            100% { background-position: -200% 0; }
                        }
                    `}</style>
                </motion.div>
            ))}
        </>
    );
}
