
"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "@/services/api";
import toast from "react-hot-toast";
import ListSkeleton from "@/components/skeletons/ListSkeleton";

interface Area {
    id: string;
    name: string;
}

interface Goal {
    id: string;
    title: string;
    area_id: string;
}

export default function GoalsPage() {
    const [goals, setGoals] = useState<Goal[]>([]);
    const [areas, setAreas] = useState<Area[]>([]);
    const [loading, setLoading] = useState(true);

    const [title, setTitle] = useState("");
    const [selectedArea, setSelectedArea] =
        useState("");

    const [editingId, setEditingId] =
        useState("");
    const [editTitle, setEditTitle] =
        useState("");

    useEffect(() => {
        fetchGoals();
        fetchAreas();
    }, []);

    const fetchGoals = async () => {
        try {
            const response = await api.get("/goals");
            setGoals(response.data);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load goals.");
        }
    };

    const fetchAreas = async () => {
        try {
            const response = await api.get("/areas");

            setAreas(response.data);

            if (response.data.length > 0) {
                setSelectedArea(response.data[0].id);
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to load areas.");
        } finally {
            setLoading(false);
        }
    };

    const createGoal = async () => {
        if (!title.trim()) {
            toast.error("Please enter a goal title.");
            return;
        }

        if (!selectedArea) {
            toast.error("Please select an area.");
            return;
        }

        try {
            await api.post("/goals", {
                title: title.trim(),
                area_id: selectedArea,
            });

            setTitle("");

            await fetchGoals();

            toast.success("Goal created successfully!");
        } catch (error) {
            console.error(error);
            toast.error("Failed to create goal.");
        }
    };

    const updateGoal = async (goalId: string) => {
        if (!editTitle.trim()) {
            toast.error("Goal title cannot be empty.");
            return;
        }

        try {
            await api.put(`/goals/${goalId}`, {
                title: editTitle.trim(),
            });

            setEditingId("");
            setEditTitle("");

            await fetchGoals();

            toast.success("Goal updated successfully!");
        } catch (error) {
            console.error(error);
            toast.error("Failed to update goal.");
        }
    };

    const deleteGoal = async (goalId: string) => {
        const confirmed = window.confirm(
            "Delete this goal?"
        );

        if (!confirmed) return;

        try {
            await api.delete(`/goals/${goalId}`);

            await fetchGoals();

            toast.success("Goal deleted successfully!");
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete goal.");
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{
                padding: "20px",
                color: "white",
                width: "100%",
                maxWidth: "1100px",
                margin: "0 auto",
                boxSizing: "border-box",
            }}
        >
            {loading ? (
                <ListSkeleton count={5} />
            ) : (
                <>
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
                                fontSize: "clamp(28px, 6vw, 40px)",
                                marginBottom: "30px",
                            }}
                        >
                            🎯 Goals
                        </h1>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.6,
                            ease: "easeOut",
                            delay: 0.15,
                        }}
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "12px",
                            marginBottom: "30px",
                        }}
                    >
                <input
                    type="text"
                    placeholder="Goal Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={{
                        flex: 1,
                        minWidth: "220px",
                        padding: "12px",
                        borderRadius: "10px",
                        border: "1px solid #374151",
                        background: "#111827",
                        color: "white",
                    }}
                />

                <select
                    value={selectedArea}
                    onChange={(e) =>
                        setSelectedArea(e.target.value)
                    }
                    style={{
                        minWidth: "220px",
                        padding: "12px",
                        borderRadius: "10px",
                        border: "1px solid #374151",
                        background: "#111827",
                        color: "white",
                    }}
                >
                    {areas.map((area) => (
                        <option
                            key={area.id}
                            value={area.id}
                        >
                            {area.name}
                        </option>
                    ))}
                </select>

                <motion.button
                    onClick={createGoal}
                    disabled={!title.trim()}
                    whileHover={
                        title.trim()
                            ? {
                                  scale: 1.05,
                                  boxShadow:
                                      "0 8px 20px rgba(34,197,94,0.25)",
                              }
                            : {}
                    }
                    whileTap={
                        title.trim()
                            ? { scale: 0.98 }
                            : {}
                    }
                    transition={{
                        duration: 0.2,
                    }}
                    style={{
                        padding: "12px 20px",
                        borderRadius: "10px",
                        border: "none",
                        background: title.trim()
                            ? "#22c55e"
                            : "#4b5563",
                        color: "white",
                        cursor: title.trim()
                            ? "pointer"
                            : "not-allowed",
                    }}
                >
                    Add Goal
                </motion.button>
            </motion.div>

            <AnimatePresence mode="popLayout">
                {goals.map((goal) => (
                    <motion.div
                        key={goal.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{
                            duration: 0.4,
                            ease: "easeOut",
                        }}
                        whileHover={
                            editingId !== goal.id
                                ? {
                                      y: -4,
                                      scale: 1.01,
                                      boxShadow:
                                          "0 10px 30px rgba(34,197,94,0.15)",
                                  }
                                : {}
                        }
                        style={{
                            marginBottom: "15px",
                            background: "#111827",
                            border: "1px solid #374151",
                            borderRadius: "14px",
                            padding: "20px",
                        }}
                    >
                        {editingId === goal.id ? (
                            <motion.div
                                initial={{
                                    opacity: 0,
                                }}
                                animate={{
                                    opacity: 1,
                                }}
                                transition={{
                                    duration: 0.3,
                                }}
                            >
                                <input
                                    value={editTitle}
                                    onChange={(e) =>
                                        setEditTitle(e.target.value)
                                    }
                                    style={{
                                        width: "100%",
                                        padding: "12px",
                                        borderRadius: "10px",
                                        border: "1px solid #374151",
                                        background: "#030712",
                                        color: "white",
                                        boxSizing: "border-box",
                                    }}
                                />

                                <div
                                    style={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                        gap: "10px",
                                        marginTop: "15px",
                                    }}
                                >
                                    <motion.button
                                        onClick={() =>
                                            updateGoal(goal.id)
                                        }
                                        whileHover={{
                                            scale: 1.05,
                                            boxShadow:
                                                "0 6px 15px rgba(34,197,94,0.3)",
                                        }}
                                        whileTap={{
                                            scale: 0.95,
                                        }}
                                        style={{
                                            padding: "10px 20px",
                                            border: "none",
                                            borderRadius: "10px",
                                            background: "#22c55e",
                                            color: "white",
                                            cursor: "pointer",
                                        }}
                                    >
                                        Save
                                    </motion.button>

                                    <motion.button
                                        onClick={() => {
                                            setEditingId("");
                                            setEditTitle("");
                                        }}
                                        whileHover={{
                                            scale: 1.05,
                                            boxShadow:
                                                "0 6px 15px rgba(107,114,128,0.3)",
                                        }}
                                        whileTap={{
                                            scale: 0.95,
                                        }}
                                        style={{
                                            padding: "10px 20px",
                                            border: "none",
                                            borderRadius: "10px",
                                            background: "#6b7280",
                                            color: "white",
                                            cursor: "pointer",
                                        }}
                                    >
                                        Cancel
                                    </motion.button>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{
                                    opacity: 0,
                                }}
                                animate={{
                                    opacity: 1,
                                }}
                                transition={{
                                    duration: 0.3,
                                }}
                            >
                                <strong
                                    style={{
                                        fontSize: "18px",
                                    }}
                                >
                                    {goal.title}
                                </strong>

                                <div
                                    style={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                        gap: "10px",
                                        marginTop: "15px",
                                    }}
                                >
                                    <motion.button
                                        onClick={() => {
                                            setEditingId(goal.id);
                                            setEditTitle(goal.title);
                                        }}
                                        whileHover={{
                                            scale: 1.05,
                                            boxShadow:
                                                "0 6px 15px rgba(37,99,235,0.3)",
                                        }}
                                        whileTap={{
                                            scale: 0.95,
                                        }}
                                        style={{
                                            padding: "10px 20px",
                                            border: "none",
                                            borderRadius: "10px",
                                            background: "#2563eb",
                                            color: "white",
                                            cursor: "pointer",
                                        }}
                                    >
                                        Edit
                                    </motion.button>

                                    <motion.button
                                        onClick={() =>
                                            deleteGoal(goal.id)
                                        }
                                        whileHover={{
                                            scale: 1.05,
                                            boxShadow:
                                                "0 6px 15px rgba(220,38,38,0.3)",
                                        }}
                                        whileTap={{
                                            scale: 0.95,
                                        }}
                                        style={{
                                            padding: "10px 20px",
                                            border: "none",
                                            borderRadius: "10px",
                                            background: "#dc2626",
                                            color: "white",
                                            cursor: "pointer",
                                        }}
                                    >
                                        Delete
                                    </motion.button>
                                </div>
                            </motion.div>
                        )}
                    </motion.div>
                ))}
            </AnimatePresence>
                </>
            )}
        </motion.div>
    );
}