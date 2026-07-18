"use client";

import { motion } from "framer-motion";

export default function DashboardSkeleton() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            {/* XP Card */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.05 }}
                style={{
                    background: "#111827",
                    padding: "25px",
                    borderRadius: "14px",
                    border: "1px solid #374151",
                    marginBottom: "30px",
                }}
            >
                <div
                    style={{
                        height: "20px",
                        width: "40%",
                        background: "linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)",
                        backgroundSize: "200% 100%",
                        borderRadius: "4px",
                        marginBottom: "15px",
                        animation: "shimmer 2s infinite",
                    }}
                />
                <div
                    style={{
                        height: "14px",
                        width: "100%",
                        background: "#374151",
                        borderRadius: "10px",
                        overflow: "hidden",
                    }}
                >
                    <div
                        style={{
                            height: "100%",
                            width: "30%",
                            background: "linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)",
                            backgroundSize: "200% 100%",
                            animation: "shimmer 2s infinite",
                        }}
                    />
                </div>
            </motion.div>

            {/* Stats Cards Grid */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(auto-fit, minmax(250px, 1fr))",
                    gap: "20px",
                }}
            >
                {Array.from({ length: 7 }).map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.1 + i * 0.05 }}
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
                    </motion.div>
                ))}
            </div>

            <style>{`
                @keyframes shimmer {
                    0% { background-position: 200% 0; }
                    100% { background-position: -200% 0; }
                }
            `}</style>
        </motion.div>
    );
}
