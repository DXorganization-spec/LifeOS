"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
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
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{
                padding: "30px",
                color: "white",
                maxWidth: "1100px",
                margin: "0 auto",
            }}
        >
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    duration: 0.6,
                    ease: "easeOut",
                    delay: 0.1,
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
            </motion.div>

            <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    duration: 0.6,
                    ease: "easeOut",
                    delay: 0.2,
                }}
                style={{
                    marginBottom: "25px",
                    color: "#d1d5db",
                }}
            >
                🔥 {totalContributions} total contributions
            </motion.h3>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    duration: 0.6,
                    ease: "easeOut",
                    delay: 0.25,
                }}
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

                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: {
                                    staggerChildren: 0.05,
                                    delayChildren: 0.35,
                                },
                            },
                        }}
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
                                <motion.span
                                    key={
                                        month
                                    }
                                    variants={{
                                        hidden: {
                                            opacity: 0,
                                        },
                                        visible: {
                                            opacity: 1,
                                        },
                                    }}
                                >
                                    {month}
                                </motion.span>
                            )
                        )}
                    </motion.div>

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

                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={{
                                hidden: { opacity: 0 },
                                visible: {
                                    opacity: 1,
                                    transition: {
                                        staggerChildren: 0.02,
                                        delayChildren: 0.4,
                                    },
                                },
                            }}
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
                                    <motion.div
                                        key={activity.id}
                                        variants={{
                                            hidden: {
                                                opacity: 0,
                                                scale: 0.5,
                                            },
                                            visible: {
                                                opacity: 1,
                                                scale: 1,
                                                transition: {
                                                    duration: 0.3,
                                                    ease: "easeOut",
                                                },
                                            },
                                        }}
                                        title={`${activity.count} tasks completed on ${activity.date}`}
                                        style={{
                                            width: "11px",
                                            height: "11px",
                                            background: getColor(activity.count),
                                            borderRadius: "2px",
                                            cursor: "pointer",
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
                        </motion.div>
                    </div>
                </div>
            </motion.div>

            <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: { opacity: 0 },
                    visible: {
                        opacity: 1,
                        transition: {
                            staggerChildren: 0.08,
                            delayChildren: 0.7,
                        },
                    },
                }}
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
                <motion.span
                    variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1 },
                    }}
                >
                    Less
                </motion.span>

                {[
                    "#161b22",
                    "#0e4429",
                    "#006d32",
                    "#26a641",
                    "#39d353",
                ].map((color) => (
                    <motion.div
                        key={color}
                        variants={{
                            hidden: { opacity: 0, scale: 0.5 },
                            visible: {
                                opacity: 1,
                                scale: 1,
                            },
                        }}
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

                <motion.span
                    variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1 },
                    }}
                >
                    More
                </motion.span>
            </motion.div>
        </motion.div>
    );
}