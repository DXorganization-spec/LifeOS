"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";
import toast from "react-hot-toast";

interface Goal {
    id: string;
    title: string;
}

interface Task {
    id: string;
    title: string;
    completed: boolean;
    goal_id: string;
}

export default function TasksPage() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [goals, setGoals] = useState<Goal[]>([]);

    const [title, setTitle] = useState("");
    const [selectedGoal, setSelectedGoal] = useState("");

    const [editingId, setEditingId] = useState("");
    const [editTitle, setEditTitle] = useState("");

    const [showAchievement, setShowAchievement] =
        useState(false);

    const [achievementText, setAchievementText] =
        useState("");

    useEffect(() => {
        void fetchTasks();
        void fetchGoals();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await api.get("/tasks");
            setTasks(response.data);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load tasks.");
        }
    };

    const fetchGoals = async () => {
        try {
            const response = await api.get("/goals");
            setGoals(response.data);

            if (response.data.length > 0) {
                setSelectedGoal(response.data[0].id);
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to load goals.");
        }
    };

    const createTask = async () => {
        if (!title.trim()) {
            toast.error("Please enter a task title.");
            return;
        }

        if (!selectedGoal) {
            toast.error("Please select a goal.");
            return;
        }

        try {
            await api.post("/tasks", {
                title: title.trim(),
                goal_id: selectedGoal,
            });

            setTitle("");

            await fetchTasks();

            toast.success("Task created successfully!");
        } catch (error) {
            console.error(error);
            toast.error("Failed to create task.");
        }
    };

    const updateTask = async (taskId: string) => {
        if (!editTitle.trim()) {
            toast.error("Task title cannot be empty.");
            return;
        }

        try {
            await api.put(`/tasks/${taskId}`, {
                title: editTitle.trim(),
            });

            setEditingId("");
            setEditTitle("");

            await fetchTasks();

            toast.success("Task updated successfully!");
        } catch (error) {
            console.error(error);
            toast.error("Failed to update task.");
        }
    };

    const deleteTask = async (taskId: string) => {
        const confirmed = window.confirm(
            "Delete this task?"
        );

        if (!confirmed) return;

        try {
            await api.delete(`/tasks/${taskId}`);

            await fetchTasks();

            toast.success("Task deleted successfully!");
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete task.");
        }
    };

    const completeTask = async (taskId: string) => {
        try {
            const response = await api.patch(
                `/tasks/${taskId}/complete`
            );

            const achievements =
                response.data.achievements || [];

            if (achievements.length > 0) {
                const latestAchievement =
                    achievements[
                    achievements.length - 1
                    ];

                setAchievementText(
                    latestAchievement
                );

                setShowAchievement(true);

                setTimeout(() => {
                    setShowAchievement(false);
                }, 4000);
            }

            await fetchTasks();
            toast.success("Task completed!");

        } catch (error) {
            console.error(error);
            toast.error("Failed to complete task.");
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
                    fontSize:
                        "clamp(28px, 6vw, 40px)",
                    marginBottom: "10px",
                }}
            >
                ✅ Tasks
            </h1>

            {showAchievement && (
                <div
                    style={{
                        position: "fixed",
                        top: "20px",
                        right: "20px",
                        background: "#111827",
                        border:
                            "2px solid #22c55e",
                        color: "#ffffff",
                        padding: "16px 24px",
                        borderRadius: "12px",
                        boxShadow:
                            "0 0 20px rgba(34,197,94,0.4)",
                        zIndex: 9999,
                        minWidth: "300px",
                    }}
                >
                    <h3
                        style={{
                            margin: 0,
                            color: "#22c55e",
                        }}
                    >
                        🎉 Achievement Unlocked!
                    </h3>

                    <p
                        style={{
                            marginTop: "10px",
                            marginBottom: 0,
                        }}
                    >
                        🏆 {achievementText}
                    </p>
                </div>
            )}

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
                    value={title}
                    onChange={(e) =>
                        setTitle(e.target.value)
                    }
                    placeholder="Task title"
                    style={{
                        flex: 1,
                        minWidth: "220px",
                        padding: "12px",
                        borderRadius: "10px",
                        border:
                            "1px solid #374151",
                        background: "#111827",
                        color: "white",
                    }}
                />

                <select
                    value={selectedGoal}
                    onChange={(e) =>
                        setSelectedGoal(
                            e.target.value
                        )
                    }
                    style={{
                        minWidth: "220px",
                        padding: "12px",
                        borderRadius: "10px",
                        border:
                            "1px solid #374151",
                        background: "#111827",
                        color: "white",
                    }}
                >
                    {goals.map((goal) => (
                        <option
                            key={goal.id}
                            value={goal.id}
                        >
                            {goal.title}
                        </option>
                    ))}
                </select>

                <button
                    onClick={createTask}
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
Add Task
                </button>
            </div>

            {tasks.map((task) => (
                <div
                    key={task.id}
                    style={{
                        marginBottom: "15px",
                        background: "#111827",
                        border: "1px solid #374151",
                        borderRadius: "14px",
                        padding: "20px",
                    }}
                >
                    {editingId === task.id ? (
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
                                    gap: "10px",
                                    marginTop: "15px",
                                    flexWrap: "wrap",
                                }}
                            >
                                <button
                                    onClick={() =>
                                        updateTask(task.id)
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
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    flexWrap: "wrap",
                                    gap: "10px",
                                }}
                            >
                                <button
                                    onClick={() =>
                                        !task.completed &&
                                        completeTask(task.id)
                                    }
                                    style={{
                                        cursor: task.completed
                                            ? "default"
                                            : "pointer",
                                        background: "transparent",
                                        border: "none",
                                        fontSize: "26px",
                                        transition: "0.2s",
                                        color: "white",
                                    }}
                                >
                                    {task.completed
                                        ? "☑"
                                        : "☐"}
                                </button>

                                <strong
                                    style={{
                                        textDecoration:
                                            task.completed
                                                ? "line-through"
                                                : "none",
                                        color: task.completed
                                            ? "#9ca3af"
                                            : "white",
                                        fontSize: "17px",
                                    }}
                                >
                                    {task.title}
                                </strong>

                                {task.completed && (
                                    <span
                                        style={{
                                            background:
                                                "#14532d",
                                            color: "#86efac",
                                            padding:
                                                "4px 10px",
                                            borderRadius:
                                                "999px",
                                            fontSize:
                                                "12px",
                                            fontWeight:
                                                "bold",
                                        }}
                                    >
                                        ✅ Completed
                                    </span>
                                )}
                            </div>

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
                                        setEditingId(
                                            task.id
                                        );
                                        setEditTitle(
                                            task.title
                                        );
                                    }}
                                    style={{
                                        padding:
                                            "10px 20px",
                                        border:
                                            "none",
                                        borderRadius:
                                            "10px",
                                        background:
                                            "#2563eb",
                                        color:
                                            "white",
                                        cursor:
                                            "pointer",
                                    }}
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() =>
                                        deleteTask(
                                            task.id
                                        )
                                    }
                                    style={{
                                        padding:
                                            "10px 20px",
                                        border:
                                            "none",
                                        borderRadius:
                                            "10px",
                                        background:
                                            "#dc2626",
                                        color:
                                            "white",
                                        cursor:
                                            "pointer",
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