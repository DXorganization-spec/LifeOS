"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";
import toast from "react-hot-toast";

interface AnalyticsData {
    tasks_completed: number;
    xp_gained: number;
    current_streak: number;
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
            const response = await api.get(
                "/analytics/weekly"
            );

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
            emoji: "📈",
            title: "Productivity",
            value: `${data.productivity_score}%`,
        },
    ];

    return (
        <div
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

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(auto-fit,minmax(240px,1fr))",
                    gap: "20px",
                }}
            >
                {cards.map((card) => (
                    <div
                        key={card.title}
                        style={{
                            background:
                                "#111827",
                            border:
                                "1px solid #374151",
                            borderRadius:
                                "16px",
                            padding: "22px",
                            cursor: "pointer",
                            transition:
                                "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease",
                            boxShadow:
                                "0 4px 10px rgba(0,0,0,0.25)",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform =
                                "translateY(-6px)";
                            e.currentTarget.style.borderColor =
                                "#22c55e";
                            e.currentTarget.style.boxShadow =
                                "0 12px 30px rgba(34,197,94,0.18)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform =
                                "translateY(0)";
                            e.currentTarget.style.borderColor =
                                "#374151";
                            e.currentTarget.style.boxShadow =
                                "0 4px 10px rgba(0,0,0,0.25)";
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
                    </div>
                ))}
            </div>

            <div
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
            </div>
        </div>
    );
}