"use client";

import { motion } from "framer-motion";

export default function HeatmapSkeleton() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            style={{
                background: "#111827",
                border: "1px solid #374151",
                borderRadius: "14px",
                padding: "20px",
                overflowX: "auto",
            }}
        >
            <div style={{ minWidth: "760px" }}>
                {/* Months Row */}
                <div
                    style={{
                        display: "flex",
                        marginLeft: "30px",
                        marginBottom: "10px",
                        gap: "24px",
                    }}
                >
                    {Array.from({ length: 12 }).map((_, i) => (
                        <div
                            key={i}
                            style={{
                                height: "12px",
                                width: "30px",
                                background: "linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)",
                                backgroundSize: "200% 100%",
                                borderRadius: "4px",
                                animation: "shimmer 2s infinite",
                            }}
                        />
                    ))}
                </div>

                {/* Grid */}
                <div style={{ display: "flex" }}>
                    {/* Day Labels */}
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            marginRight: "8px",
                            height: "101px",
                            gap: "30px",
                        }}
                    >
                        {Array.from({ length: 3 }).map((_, i) => (
                            <div
                                key={i}
                                style={{
                                    height: "11px",
                                    width: "20px",
                                    background: "linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)",
                                    backgroundSize: "200% 100%",
                                    borderRadius: "2px",
                                    animation: "shimmer 2s infinite",
                                }}
                            />
                        ))}
                    </div>

                    {/* Heatmap Cells */}
                    <div
                        style={{
                            display: "grid",
                            gridAutoFlow: "column",
                            gridAutoColumns: "11px",
                            gridTemplateRows: "repeat(7, 11px)",
                            gap: "3px",
                        }}
                    >
                        {Array.from({ length: 364 }).map((_, i) => (
                            <div
                                key={i}
                                style={{
                                    width: "11px",
                                    height: "11px",
                                    background: "linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%)",
                                    backgroundSize: "200% 100%",
                                    borderRadius: "2px",
                                    animation: "shimmer 2s infinite",
                                }}
                            />
                        ))}
                    </div>
                </div>
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
