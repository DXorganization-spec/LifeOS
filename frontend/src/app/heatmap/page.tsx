"use client";

import { useEffect, useMemo, useState } from "react";
import api from "@/services/api";

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
            const response =
                await api.get("/heatmap");

            setActivities(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const getColor = (count: number) => {
        if (count === 0) return "#161b22";
        if (count <= 2) return "#0e4429";
        if (count <= 5) return "#006d32";
        if (count <= 8) return "#26a641";

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
                Visualize your productivity
                like GitHub contributions.
            </p>

            <h3
                style={{
                    marginBottom: "25px",
                }}
            >
                {totalContributions} tasks
                completed in the last year
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
                                display:
                                    "grid",
                                gridTemplateRows:
                                    "repeat(7, 11px)",
                                gridTemplateColumns:
                                    "repeat(53, 11px)",
                                gridAutoFlow:
                                    "column",
                                gap: "3px",
                            }}
                        >
                            {activities.map(
                                (
                                    activity
                                ) => (
                                    <div
                                        key={
                                            activity.id
                                        }
                                        title={`${activity.count} tasks completed on ${activity.date}`}
                                        style={{
                                            width:
                                                "11px",
                                            height:
                                                "11px",
                                            background:
                                                getColor(
                                                    activity.count
                                                ),
                                            borderRadius:
                                                "2px",
                                            cursor:
                                                "pointer",
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