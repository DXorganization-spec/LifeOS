"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";

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
        fetchAnalytics();
    }, []);

    const fetchAnalytics = async () => {
        try {
            const response = await api.get(
                "/analytics/weekly"
            );
            console.log(response.data)

            setData(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    if (!data) {
        return <h2>Loading...</h2>;
    }

    return (
        <div style={{ padding: "20px" }}>
            <h1>Analytics</h1>

            <hr />

            <p>
                ✅ Tasks Completed:{" "}
                {data.tasks_completed}
            </p>

            <p>
                ⭐ XP Gained:{" "}
                {data.xp_gained}
            </p>

            <p>
                🔥 Current Streak:{" "}
                {data.current_streak}
            </p>

            <p>
                📈 Productivity Score:{" "}
                {data.productivity_score}
            </p>
        </div>
    );
}