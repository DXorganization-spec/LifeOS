"use client";

import { motion } from "framer-motion";

interface StatCardProps {
    emoji: string;
    title: string;
    value: string | number;
}

export default function StatCard({
    emoji,
    title,
    value,
}: StatCardProps) {
    return (
        <motion.div
            style={{
                background: "#111827",
                padding: "20px",
                borderRadius: "16px",
                border: "1px solid #374151",
                boxSizing: "border-box",
                cursor: "pointer",
                boxShadow:
                    "0 4px 10px rgba(0,0,0,0.25)",
            }}
            whileHover={{
                y: -6,
                scale: 1.02,
                borderColor: "#22c55e",
                boxShadow:
                    "0 12px 30px rgba(34,197,94,0.18)",
            }}
            transition={{
                duration: 0.3,
                ease: "easeOut",
            }}
        >
            <h3
                style={{
                    margin: 0,
                    color: "#9ca3af",
                    fontWeight: 500,
                    fontSize: "16px",
                }}
            >
                {emoji} {title}
            </h3>

            <h2
                style={{
                    marginTop: "18px",
                    fontSize: "clamp(24px, 5vw, 34px)",
                    fontWeight: "bold",
                    color: "white",
                }}
            >
                {value}
            </h2>
        </motion.div>
    );
}