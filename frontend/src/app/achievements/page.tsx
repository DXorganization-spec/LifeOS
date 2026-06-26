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
        fetchAchievements();
    }, []);

    const fetchAchievements = async () => {
        try {
            const response = await api.get(
                "/achievements"
            );

            setAchievements(
                response.data
            );
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Achievements</h1>

            <hr />

            {achievements.length === 0 ? (
                <p>
                    No achievements unlocked
                    yet.
                </p>
            ) : (
                achievements.map(
                    (achievement) => (
                        <div
                            key={
                                achievement.id
                            }
                            style={{
                                marginBottom:
                                    "20px",
                            }}
                        >
                            <h3>
                                🏆{" "}
                                {
                                    achievement.title
                                }
                            </h3>

                            <p>
                                {
                                    achievement.description
                                }
                            </p>

                            <hr />
                        </div>
                    )
                )
            )}
        </div>
    );
}