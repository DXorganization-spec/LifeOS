"use client";

import { motion } from "framer-motion";

interface ListSkeletonProps {
    count?: number;
}

export default function ListSkeleton({ count = 5 }: ListSkeletonProps) {
    return (
        <>
            {Array.from({ length: count }).map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    style={{
                        background: "#111827",
                        padding: "20px",
                        borderRadius: "14px",
                        border: "1px solid #374151",
                        marginBottom: "15px",
                        boxSizing: "border-box",
                    }}
                >
                    <div
                        style={{
                            height: "18px",
                            background: "linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)",
                            backgroundSize: "200% 100%",
                            borderRadius: "4px",
                            width: "60%",
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
