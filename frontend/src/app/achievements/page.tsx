
"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";

interface Achievement {
    id: string;
    title: string;
    description: string;
}

const allAchievements = [
    {
        title: "First Task",
        description: "Complete your first task",
    },
    {
        title: "Goal Crusher",
        description: "Complete one goal",
    },
    {
        title: "100 XP Club",
        description: "Reach 100 XP",
    },
    {
        title: "500 XP Club",
        description: "Reach 500 XP",
    },
    {
        title: "30 Day Streak",
        description: "Maintain a 30 day streak",
    },
];

export default function AchievementsPage() {
    const [achievements, setAchievements] = useState<
        Achievement[]
    >([]);

    const fetchAchievements = async () => {
        try {
            const response = await api.get(
                "/achievements"
            );

            setAchievements(response.data);
        } catch (error) {
            console.error(error);
        }
    };


    useEffect(() => {
        void fetchAchievements();
    }, []);

    
    return (
        <div
            style={{
                padding: "30px",
                maxWidth: "1100px",
                margin: "0 auto",
                color: "white",
            }}
        >
            <h1
                style={{
                    fontSize: "40px",
                    marginBottom: "10px",
                }}
            >
                🏆 Achievements
            </h1>

            <p
                style={{
                    color: "#9ca3af",
                    marginBottom: "30px",
                }}
            >
                Track your milestones and celebrate your progress.
            </p>

            <div
                style={{
                    background: "#111827",
                    border: "1px solid #374151",
                    borderRadius: "14px",
                    padding: "20px",
                    marginBottom: "30px",
                }}
            >
                <h2>
                    Total Unlocked:{" "}
                    {achievements.length}
                </h2>
            </div>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(auto-fit, minmax(300px, 1fr))",
                    gap: "20px",
                }}
            >
                {allAchievements.map(
                    (achievement) => {
                        const unlocked =
                            achievements.some(
                                (a) =>
                                    a.title ===
                                    achievement.title
                            );

                        return (
                            <div
                                key={
                                    achievement.title
                                }
                                style={{
                                    background:
                                        "#111827",
                                    border:
                                        unlocked
                                            ? "1px solid #22c55e"
                                            : "1px solid #374151",
                                    borderRadius:
                                        "14px",
                                    padding:
                                        "25px",
                                    opacity:
                                        unlocked
                                            ? 1
                                            : 0.6,
                                }}
                            >
                                <h2
                                    style={{
                                        marginTop: 0,
                                    }}
                                >
                                    {unlocked
                                        ? "🏆"
                                        : "🔒"}{" "}
                                    {
                                        achievement.title
                                    }
                                </h2>

                                <p
                                    style={{
                                        color:
                                            "#d1d5db",
                                    }}
                                >
                                    {
                                        achievement.description
                                    }
                                </p>

                                <p
                                    style={{
                                        color:
                                            unlocked
                                                ? "#22c55e"
                                                : "#9ca3af",
                                        fontWeight:
                                            "bold",
                                        marginTop:
                                            "20px",
                                    }}
                                >
                                    {unlocked
                                        ? "✅ Unlocked"
                                        : "🔒 Locked"}
                                </p>
                            </div>
                        );
                    }
                )}
            </div>
        </div>
    );
}

