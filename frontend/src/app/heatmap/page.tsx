"use client";

import { useEffect, useMemo, useState } from "react";
import api from "@/services/api";
import toast from "react-hot-toast";

interface Activity {
    id: string;
    date: string;
    count: number;
}

export default function HeatmapPage() {
    const [activities, setActivities] = useState<
        Activity[]
    >([]);

    useEffect(() => {
        void fetchHeatmap();
    }, []);

    const fetchHeatmap = async () => {
        try {
            const response = await api.get("/heatmap");
            setActivities(response.data);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load heatmap.");
        }
    };

    const getColor = (count: number) => {
        if (count === 0) return "#161b22";
        if (count <= 2) return "#0e4429";
        if (count <= 5) return "#006d32";
        if (count <= 6) return "#26a641";

        return "#39d353";
    };

    const totalContributions = useMemo(() => {
        return activities.reduce(
            (sum, activity) =>
                sum + activity.count,
            0
        );
    }, [activities]);

    const months = [
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
    ];

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
                    fontSize:
                        "clamp(28px,6vw,40px)",
                    marginBottom: "10px",
                }}
            >
                🔥 Activity Heatmap
            </h1>

            <p
                style={{
                    color: "#9ca3af",
                    marginBottom: "30px",
                }}
            >
                Track your consistency and daily productivity throughout your LifeOS journey.
            </p>

            <h3
                style={{
                    marginBottom: "25px",
                    color: "#d1d5db",
                }}
            >
                🔥 {totalContributions} total contributions
            </h3>
            <div
                style={{
                    background: "#111827",
                    border:
                        "1px solid #374151",
                    borderRadius: "14px",
                    padding: "20px",
                    overflowX: "auto",
                }}
            >
                <div
                    style={{
                        minWidth: "760px",
                    }}
                >
                    {/* Months */}

                    <div
                        style={{
                            display: "flex",
                            marginLeft: "30px",
                            marginBottom: "10px",
                            color: "#9ca3af",
                            fontSize: "12px",
                            gap: "24px",
                        }}
                    >
                        {months.map(
                            (month) => (
                                <span
                                    key={
                                        month
                                    }
                                >
                                    {month}
                                </span>
                            )
                        )}
                    </div>

                    <div
                        style={{
                            display: "flex",
                        }}
                    >
                        {/* Day Labels */}

                        <div
                            style={{
                                display: "flex",
                                flexDirection:
                                    "column",
                                justifyContent:
                                    "space-between",
                                marginRight:
                                    "8px",
                                height:
                                    "101px",
                                color:
                                    "#9ca3af",
                                fontSize:
                                    "11px",
                            }}
                        >
                            <span>
                                Mon
                            </span>
                            <span>
                                Wed
                            </span>
                            <span>
                                Fri
                            </span>
                        </div>

                        {/* Grid */}

                        <div
                            style={{
                                display: "grid",
                                gridAutoFlow: "column",
                                gridAutoColumns: "11px",
                                gridTemplateRows: "repeat(7, 11px)",
                                gap: "3px",
                            }}
                        >
                            {activities.map(
                                (
                                    activity
                                ) => (
                                    <div
                                        key={activity.id}
                                        title={`${activity.count} tasks completed on ${activity.date}`}
                                        style={{
                                            width: "11px",
                                            height: "11px",
                                            background: getColor(activity.count),
                                            borderRadius: "2px",
                                            cursor: "pointer",
                                            transition: "transform 0.15s ease",
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.transform =
                                                "scale(1.25)";
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform =
                                                "scale(1)";
                                        }}
                                    />
                                )
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div
                style={{
                    display: "flex",
                    justifyContent:
                        "flex-end",
                    alignItems:
                        "center",
                    gap: "6px",
                    marginTop: "20px",
                    color: "#9ca3af",
                    fontSize: "12px",
                    flexWrap: "wrap",
                }}
            >
                <span>Less</span>

                {[
                    "#161b22",
                    "#0e4429",
                    "#006d32",
                    "#26a641",
                    "#39d353",
                ].map((color) => (
                    <div
                        key={color}
                        style={{
                            width: "11px",
                            height: "11px",
                            background:
                                color,
                            borderRadius:
                                "2px",
                        }}
                    />
                ))}

                <span>More</span>
            </div>
        </div>
    );
}