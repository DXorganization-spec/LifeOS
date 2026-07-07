
"use client";

import { useEffect, useState } from "react";
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

            {/* XP CARD */}

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
                    <div
                        style={{
                            width: `${progress}%`,
                            height: "100%",
                            background:
                                "#22c55e",
                            transition:
                                "width 0.5s ease",
                        }}
                    />
                </div>
            </div>

            {/* STATS */}

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(auto-fit, minmax(250px, 1fr))",
                    gap: "20px",
                }}
            >
                <StatCard
                    emoji="🔥"
                    title="Current Streak"
                    value={`${data.current_streak} Days`}
                />

                <StatCard
                    emoji="🏆"
                    title="Longest Streak"
                    value={`${data.longest_streak} Days`}
                />

                <StatCard
                    emoji="📈"
                    title="Today's Progress"
                    value={`${data.progress_percentage}%`}
                />

                <StatCard
                    emoji="📂"
                    title="Areas"
                    value={data.areas}
                />

                <StatCard
                    emoji="🎯"
                    title="Goals"
                    value={data.goals}
                />

                <StatCard
                    emoji="📝"
                    title="Tasks"
                    value={data.tasks}
                />

                <StatCard
                    emoji="✅"
                    title="Completed"
                    value={data.completed_tasks}
                />
            </div>
        </div>
    );
}