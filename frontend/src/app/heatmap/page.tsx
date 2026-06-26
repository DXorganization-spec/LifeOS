"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";

interface Activity {
    id: string;
    date: string;
    count: number;
}

export default function HeatmapPage() {
    const [activities, setActivities] =
        useState<Activity[]>([]);

    useEffect(() => {
        fetchHeatmap();
    }, []);

    const fetchHeatmap = async () => {
        try {
            const response = await api.get(
                "/heatmap"
            );

            setActivities(
                response.data
            );
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Activity Heatmap</h1>

            <hr />

            {activities.length === 0 ? (
                <p>No activity found.</p>
            ) : (
                activities.map(
                    (activity) => (
                        <div
                            key={activity.id}
                            style={{
                                marginBottom:
                                    "15px",
                            }}
                        >
                            <strong>
                                {activity.date}
                            </strong>

                            <div>
                                {"█".repeat(
                                    activity.count
                                )}
                            </div>

                            <div>
                                {
                                    activity.count
                                }{" "}
                                tasks completed
                            </div>
                        </div>
                    )
                )
            )}
        </div>
    );
}