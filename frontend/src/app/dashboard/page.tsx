
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "@/services/api";
import StatCard from "@/components/StatCard";
import DashboardSkeleton from "@/components/skeletons/DashboardSkeleton";
import PageTransition from "@/components/animations/PageTransition";
import AnimatedCard from "@/components/animations/AnimatedCard";
import StaggerContainer from "@/components/animations/StaggerContainer";
import StaggerItem from "@/components/animations/StaggerItem";

export default function DashboardPage() {
    interface DashboardData {
        level: number;
        xp: number;
        current_streak: number;
        longest_streak: number;
        progress_percentage: number;
        areas: number;
        goals: number;
        tasks: number;
        completed_tasks: number;
    }

    const [data, setData] = useState<DashboardData | null>(null);

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
                <DashboardSkeleton />
            </div>
        );
    }

    const nextLevelXP = data.level * 100;

    const progress = Math.min(
        (data.xp / nextLevelXP) * 100,
        100
    );

    return (
        <PageTransition>
            <div
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

                <AnimatedCard delay={0.2}>
                    <div
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
                    </div>
                </AnimatedCard>

                {/* STATS */}

                <StaggerContainer
                    delayChildren={0.35}
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
                        <StaggerItem key={index}>
                            <StatCard
                                emoji={card.emoji}
                                title={card.title}
                                value={card.value}
                            />
                        </StaggerItem>
                    ))}
                </StaggerContainer>
            </div>
        </PageTransition>
    );
}