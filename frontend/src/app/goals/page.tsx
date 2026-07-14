
"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";
import toast from "react-hot-toast";

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
        <div
            style={{
                padding: "20px",
                color: "white",
                width: "100%",
                maxWidth: "1100px",
                margin: "0 auto",
                boxSizing: "border-box",
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

            <div
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

                <button
                    onClick={createGoal}
                    disabled={!title.trim()}
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
                </button>
            </div>

            {goals.map((goal) => (
                <div
                    key={goal.id}
                    style={{
                        marginBottom: "15px",
                        background: "#111827",
                        border: "1px solid #374151",
                        borderRadius: "14px",
                        padding: "20px",
                    }}
                >
                    {editingId === goal.id ? (
                        <>
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
                                <button
                                    onClick={() =>
                                        updateGoal(goal.id)
                                    }
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
                                </button>

                                <button
                                    onClick={() => {
                                        setEditingId("");
                                        setEditTitle("");
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
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
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
                                <button
                                    onClick={() => {
                                        setEditingId(goal.id);
                                        setEditTitle(goal.title);
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
                                </button>

                                <button
                                    onClick={() =>
                                        deleteGoal(goal.id)
                                    }
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
                                </button>
                            </div>
                        </>
                    )}
                </div>
            ))}
        </div>
    );
}