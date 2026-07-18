
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "@/services/api";
import XPChart from "@/components/XPChart";
import StatCard from "@/components/StatCard";

export default function DashboardPage() {
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const response = await api.get(
                    "/dashboard"
                );
                setData(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        void fetchDashboard();
    }, []);

    if (!data) {
        return (
            <div
                style={{
                    color: "white",
                    padding: "40px",
                    fontSize: "22px",
                }}
            >
                Loading Dashboard...
            </div>
        );
    }

    const nextLevelXP = data.level * 100;

    const progress = Math.min(
        (data.xp / nextLevelXP) * 100,
        100
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{
                padding: "30px",
                color: "white",
                width: "100%",
                maxWidth: "1100px",
                margin: "0 auto",
                minHeight: "100vh",
                background: "#030712",
                boxSizing: "border-box",
            }}
        >
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    duration: 0.6,
                    ease: "easeOut",
                    delay: 0.1,
                }}
            >
                <h1
                    style={{
                        fontSize:
                            "clamp(28px, 6vw, 40px)",
                        marginBottom: "5px",
                    }}
                >
                    🚀 LifeOS Dashboard
                </h1>

                <p
                    style={{
                        color: "#9ca3af",
                        marginBottom: "30px",
                    }}
                >
                    Welcome back. Keep building your
                    best self.
                </p>
            </motion.div>

            {/* XP CARD */}

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    duration: 0.6,
                    ease: "easeOut",
                    delay: 0.2,
                }}
                whileHover={{
                    boxShadow:
                        "0 8px 25px rgba(34,197,94,0.1)",
                }}
                style={{
                    background: "#111827",
                    padding: "25px",
                    borderRadius: "14px",
                    border: "1px solid #374151",
                    marginBottom: "30px",
                }}
            >
                <h2>⭐ Level {data.level}</h2>

                <p
                    style={{
                        color: "#9ca3af",
                        marginBottom: "15px",
                    }}
                >
                    XP: {data.xp} / {nextLevelXP}
                </p>

                <div
                    style={{
                        width: "100%",
                        height: "14px",
                        background: "#374151",
                        borderRadius: "10px",
                        overflow: "hidden",
                    }}
                >
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{
                            width: `${progress}%`,
                        }}
                        transition={{
                            duration: 0.8,
                            ease: "easeOut",
                            delay: 0.3,
                        }}
                        style={{
                            height: "100%",
                            background:
                                "#22c55e",
                        }}
                    />
                </div>
            </motion.div>

            {/* STATS */}

            <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: { opacity: 0 },
                    visible: {
                        opacity: 1,
                        transition: {
                            staggerChildren: 0.08,
                            delayChildren: 0.35,
                        },
                    },
                }}
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(auto-fit, minmax(250px, 1fr))",
                    gap: "20px",
                }}
            >
                {[
                    {
                        emoji: "🔥",
                        title: "Current Streak",
                        value: `${data.current_streak} Days`,
                    },
                    {
                        emoji: "🏆",
                        title: "Longest Streak",
                        value: `${data.longest_streak} Days`,
                    },
                    {
                        emoji: "📈",
                        title: "Today's Progress",
                        value: `${data.progress_percentage}%`,
                    },
                    {
                        emoji: "📂",
                        title: "Areas",
                        value: data.areas,
                    },
                    {
                        emoji: "🎯",
                        title: "Goals",
                        value: data.goals,
                    },
                    {
                        emoji: "📝",
                        title: "Tasks",
                        value: data.tasks,
                    },
                    {
                        emoji: "✅",
                        title: "Completed",
                        value: data.completed_tasks,
                    },
                ].map((card, index) => (
                    <motion.div
                        key={index}
                        variants={{
                            hidden: {
                                opacity: 0,
                                y: 20,
                            },
                            visible: {
                                opacity: 1,
                                y: 0,
                                transition: {
                                    duration: 0.5,
                                    ease: "easeOut",
                                },
                            },
                        }}
                    >
                        <StatCard
                            emoji={card.emoji}
                            title={card.title}
                            value={card.value}
                        />
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    );
}