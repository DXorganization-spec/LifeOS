"use client";

import { motion } from "framer-motion";

export default function AnalyticsSkeleton() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            {/* Title Skeleton */}
            <div
                style={{
                    height: "32px",
                    width: "25%",
                    background: "linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)",
                    backgroundSize: "200% 100%",
                    borderRadius: "4px",
                    marginBottom: "35px",
                    animation: "shimmer 2s infinite",
                }}
            />

            {/* Analytics Cards Grid */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(auto-fit,minmax(240px,1fr))",
                    gap: "20px",
                    marginBottom: "40px",
                }}
            >
                {Array.from({ length: 8 }).map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.05 + i * 0.05 }}
                        style={{
                            background: "#111827",
                            border: "1px solid #374151",
                            borderRadius: "16px",
                            padding: "22px",
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
                                height: "28px",
                                background: "linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)",
                                backgroundSize: "200% 100%",
                                borderRadius: "4px",
                                animation: "shimmer 2s infinite",
                            }}
                        />
                    </motion.div>
                ))}
            </div>

            {/* Weekly Summary Skeleton */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.5 }}
                style={{
                    background: "#111827",
                    border: "1px solid #374151",
                    borderRadius: "16px",
                    padding: "25px",
                }}
            >
                <div
                    style={{
                        height: "20px",
                        width: "30%",
                        background: "linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)",
                        backgroundSize: "200% 100%",
                        borderRadius: "4px",
                        marginBottom: "15px",
                        animation: "shimmer 2s infinite",
                    }}
                />
                <div
                    style={{
                        height: "16px",
                        width: "100%",
                        background: "linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)",
                        backgroundSize: "200% 100%",
                        borderRadius: "4px",
                        marginBottom: "8px",
                        animation: "shimmer 2s infinite",
                    }}
                />
                <div
                    style={{
                        height: "16px",
                        width: "80%",
                        background: "linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)",
                        backgroundSize: "200% 100%",
                        borderRadius: "4px",
                        animation: "shimmer 2s infinite",
                    }}
                />
            </motion.div>

            <style>{`
                @keyframes shimmer {
                    0% { background-position: 200% 0; }
                    100% { background-position: -200% 0; }
                }
            `}</style>
        </motion.div>
    );
}
