"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";

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
    const [selectedArea, setSelectedArea] = useState("");

    const [editingId, setEditingId] = useState("");
    const [editTitle, setEditTitle] = useState("");

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
        }
    };

    const createGoal = async () => {
        try {
            await api.post("/goals", {
                title,
                area_id: selectedArea,
            });

            setTitle("");
            fetchGoals();
        } catch (error) {
            console.error(error);
        }
    };

    const updateGoal = async (goalId: string) => {
        try {
            await api.put(`/goals/${goalId}`, {
                title: editTitle,
            });

            setEditingId("");
            setEditTitle("");

            fetchGoals();
        } catch (error) {
            console.error(error);
        }
    };

    const deleteGoal = async (goalId: string) => {
        const confirmed = window.confirm(
            "Delete this goal?"
        );

        if (!confirmed) return;

        try {
            await api.delete(`/goals/${goalId}`);

            fetchGoals();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Goals</h1>

            <input
                type="text"
                placeholder="Goal Title"
                value={title}
                onChange={(e) =>
                    setTitle(e.target.value)
                }
            />

            <select
                value={selectedArea}
                onChange={(e) =>
                    setSelectedArea(e.target.value)
                }
                style={{ marginLeft: "10px" }}
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
                style={{ marginLeft: "10px" }}
            >
                Add Goal
            </button>

            <hr />

            {goals.map((goal) => (
                <div
                    key={goal.id}
                    style={{
                        marginBottom: "15px",
                    }}
                >
                    {editingId === goal.id ? (
                        <>
                            <input
                                value={editTitle}
                                onChange={(e) =>
                                    setEditTitle(
                                        e.target.value
                                    )
                                }
                            />

                            <button
                                onClick={() =>
                                    updateGoal(goal.id)
                                }
                            >
                                Save
                            </button>
                        </>
                    ) : (
                        <>
                            <strong>
                                {goal.title}
                            </strong>

                            <button
                                onClick={() => {
                                    setEditingId(
                                        goal.id
                                    );
                                    setEditTitle(
                                        goal.title
                                    );
                                }}
                                style={{
                                    marginLeft: "10px",
                                }}
                            >
                                Edit
                            </button>

                            <button
                                onClick={() =>
                                    deleteGoal(
                                        goal.id
                                    )
                                }
                                style={{
                                    marginLeft: "10px",
                                }}
                            >
                                Delete
                            </button>
                        </>
                    )}
                </div>
            ))}
        </div>
    );
}