"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "@/services/api";
import toast from "react-hot-toast";

interface AnalyticsData {
    tasks_completed: number;
    xp_gained: number;
    current_streak: number;
    longest_streak: number;
    level: number;
    total_xp: number;
    active_days: number;
    productivity_score: number;
}
export default function AnalyticsPage() {
    const [data, setData] =
        useState<AnalyticsData | null>(null);

    useEffect(() => {
        void fetchAnalytics();
    }, []);

    const fetchAnalytics = async () => {
        try {
            const response = await api.get("/analytics/weekly-summary");
    

            setData(response.data);
        } catch (error) {
            console.error(error);
            toast.error(
                "Failed to load analytics."
            );
        }
    };

    if (!data) {
        return (
            <div
                style={{
                    color: "white",
                    padding: "40px",
                    fontSize: "22px",
                }}
            >
                Loading Analytics...
            </div>
        );
    }

    const cards = [
        {
            emoji: "✅",
            title: "Tasks Completed",
            value: data.tasks_completed,
        },
        {
            emoji: "⭐",
            title: "XP Gained",
            value: data.xp_gained,
        },
        {
            emoji: "🔥",
            title: "Current Streak",
            value: data.current_streak,
        },
        {
            emoji: "🏆",
            title: "Longest Streak",
            value: data.longest_streak,
        },
        {
            emoji: "🎖️",
            title: "Level",
            value: data.level,
        },
        {
            emoji: "💎",
            title: "Total XP",
            value: data.total_xp,
        },
        {
            emoji: "📅",
            title: "Active Days",
            value: data.active_days,
        },
        {
            emoji: "📈",
            title: "Productivity",
            value: `${data.productivity_score}%`,
        },
    ];

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
                            "clamp(28px,6vw,40px)",
                        marginBottom: "10px",
                    }}
                >
                    📊 Analytics
                </h1>

                <p
                    style={{
                        color: "#9ca3af",
                        marginBottom: "35px",
                        fontSize: "16px",
                    }}
                >
                    Monitor your performance,
                    streaks and achievements in one
                    place.
                </p>
            </motion.div>

            <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: { opacity: 0 },
                    visible: {
                        opacity: 1,
                        transition: {
                            staggerChildren: 0.08,
                            delayChildren: 0.25,
                        },
                    },
                }}
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(auto-fit,minmax(240px,1fr))",
                    gap: "20px",
                }}
            >
                {cards.map((card) => (
                    <motion.div
                        key={card.title}
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
                        style={{
                            background:
                                "#111827",
                            border:
                                "1px solid #374151",
                            borderRadius:
                                "16px",
                            padding: "22px",
                            cursor: "pointer",
                            boxShadow:
                                "0 4px 10px rgba(0,0,0,0.25)",
                        }}
                    >
                        <h3
                            style={{
                                margin: 0,
                                color:
                                    "#9ca3af",
                                fontWeight: 500,
                                fontSize:
                                    "16px",
                            }}
                        >
                            {card.emoji}{" "}
                            {card.title}
                        </h3>

                        <h2
                            style={{
                                marginTop:
                                    "20px",
                                fontSize:
                                    "clamp(28px,5vw,36px)",
                                fontWeight:
                                    "bold",
                                color:
                                    "white",
                            }}
                        >
                            {card.value}
                        </h2>
                    </motion.div>
                ))}
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    duration: 0.6,
                    ease: "easeOut",
                    delay: 0.8,
                }}
                style={{
                    marginTop: "40px",
                    background: "#111827",
                    border:
                        "1px solid #374151",
                    borderRadius: "16px",
                    padding: "25px",
                }}
            >
                <h2
                    style={{
                        marginTop: 0,
                    }}
                >
                    🚀 Weekly Summary
                </h2>

                <p
                    style={{
                        color: "#d1d5db",
                        fontSize: "16px",
                        lineHeight: 1.8,
                        marginBottom: 0,
                    }}
                >
                    {data.productivity_score >=
                        90
                        ? "🏆 Outstanding performance! You're consistently completing your goals. Keep maintaining this momentum."
                        : data.productivity_score >=
                            75
                            ? "🔥 Excellent work! You're making strong progress toward your goals."
                            : data.productivity_score >=
                                50
                                ? "💪 You're progressing well. Stay consistent to improve your productivity."
                                : "🌱 Every great journey starts with small steps. Stay consistent and your progress will compound over time."}
                </p>
            </motion.div>
        </motion.div>
    );
}