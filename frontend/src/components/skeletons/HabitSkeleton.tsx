"use client";

import { motion } from "framer-motion";

export default function HabitSkeleton() {
    return (
        <>
            {[1, 2, 3].map((item) => (
                <motion.div
                    key={item}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                        duration: 0.5,
                        delay: item * 0.1,
                    }}
                    style={{
                        background: "#111827",
                        border: "1px solid #374151",
                        borderRadius: "14px",
                        padding: "20px",
                        marginBottom: "16px",
                    }}
                >
                    <div
                        style={{
                            width: "45%",
                            height: "22px",
                            background: "#1f2937",
                            borderRadius: "8px",
                            marginBottom: "14px",
                        }}
                    />

                    <div
                        style={{
                            width: "80%",
                            height: "14px",
                            background: "#1f2937",
                            borderRadius: "8px",
                            marginBottom: "8px",
                        }}
                    />

                    <div
                        style={{
                            width: "60%",
                            height: "14px",
                            background: "#1f2937",
                            borderRadius: "8px",
                        }}
                    />
                </motion.div>
            ))}
        </>
    );
}