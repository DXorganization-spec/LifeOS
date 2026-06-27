
"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";

interface Achievement {
    id: string;
    title: string;
    description: string;
}

export default function AchievementsPage() {
    const [achievements, setAchievements] = useState<
        Achievement[]
    >([]);

    useEffect(() => {
        void fetchAchievements();
    }, []);

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
                    Total Unlocked: {achievements.length}
                </h2>
            </div>

            {achievements.length === 0 ? (
                <div
                    style={{
                        background: "#111827",
                        border: "1px solid #374151",
                        borderRadius: "14px",
                        padding: "30px",
                        textAlign: "center",
                    }}
                >
                    <h2>🏆</h2>
                    <p
                        style={{
                            color: "#9ca3af",
                        }}
                    >
                        No achievements unlocked yet.
                    </p>
                </div>
            ) : (
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fit, minmax(300px, 1fr))",
                        gap: "20px",
                    }}
                >
                    {achievements.map(
                        (achievement) => (
                            <div
                                key={
                                    achievement.id
                                }
                                style={{
                                    background:
                                        "#111827",
                                    border:
                                        "1px solid #374151",
                                    borderRadius:
                                        "14px",
                                    padding:
                                        "25px",
                                }}
                            >
                                <h2
                                    style={{
                                        marginTop: 0,
                                    }}
                                >
                                    🏆{" "}
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
                            </div>
                        )
                    )}
                </div>
            )}
        </div>
    );
}
