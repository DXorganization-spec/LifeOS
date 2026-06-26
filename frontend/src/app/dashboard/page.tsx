"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";

export default function DashboardPage() {
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const response = await api.get("/dashboard");
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
                maxWidth: "1100px",
                margin: "0 auto",
            }}
        >
            <h1
                style={{
                    fontSize: "40px",
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
                Welcome back. Keep building your best self.
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

                <p>
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
                            background: "#22c55e",
                        }}
                    />
                </div>
            </div>

            {/* STATS */}

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(auto-fit, minmax(220px,1fr))",
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

            {/* MOTIVATION */}

            <div
                style={{
                    marginTop: "35px",
                    background: "#111827",
                    padding: "25px",
                    borderRadius: "14px",
                    border: "1px solid #374151",
                }}
            >
                <h2>💡 Motivation</h2>

                <p
                    style={{
                        fontSize: "18px",
                        color: "#d1d5db",
                    }}
                >
                    {data.progress_percentage >= 100
                        ? "🏆 Outstanding! You completed everything today."
                        : data.progress_percentage >= 75
                        ? "🔥 You're close to finishing. Keep going!"
                        : data.progress_percentage >= 50
                        ? "💪 You're making solid progress."
                        : data.progress_percentage >= 25
                        ? "🚀 Good start. Stay consistent."
                        : "🌱 Small wins every day build extraordinary results."}
                </p>
            </div>
        </div>
    );
}

function StatCard({
    emoji,
    title,
    value,
}: {
    emoji: string;
    title: string;
    value: string | number;
}) {
    return (
        <div
            style={{
                background: "#111827",
                padding: "20px",
                borderRadius: "14px",
                border: "1px solid #374151",
            }}
        >
            <h3
                style={{
                    margin: 0,
                    color: "#9ca3af",
                }}
            >
                {emoji} {title}
            </h3>

            <h2
                style={{
                    marginTop: "15px",
                    fontSize: "32px",
                }}
            >
                {value}
            </h2>
        </div>
    );
}