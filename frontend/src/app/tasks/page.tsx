"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";

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
        fetchTasks();
        fetchGoals();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await api.get("/tasks");
            setTasks(response.data);
        } catch (error) {
            console.error(error);
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
        }
    };

    const createTask = async () => {
        try {
            await api.post("/tasks", {
                title,
                goal_id: selectedGoal,
            });

            setTitle("");
            fetchTasks();
        } catch (error) {
            console.error(error);
        }
    };

    const updateTask = async (taskId: string) => {
        try {
            await api.put(`/tasks/${taskId}`, {
                title: editTitle,
            });

            setEditingId("");
            setEditTitle("");

            fetchTasks();
        } catch (error) {
            console.error(error);
        }
    };

    const deleteTask = async (taskId: string) => {
        const confirmed = window.confirm(
            "Delete this task?"
        );

        if (!confirmed) return;

        try {
            await api.delete(`/tasks/${taskId}`);
            fetchTasks();
        } catch (error) {
            console.error(error);
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

        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div style={{ padding: "20px" }}>
            <h1>Tasks</h1>
            <p>
                Popup State:
                {showAchievement ? "TRUE" : "FALSE"}
            </p>

            {showAchievement && (
                <div
                    style={{
                        position: "fixed",
                        top: "20px",
                        right: "20px",
                        background: "#111827",
                        border: "2px solid #22c55e",
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

            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Task title"
            />
            <select
                value={selectedGoal}
                onChange={(e) =>
                    setSelectedGoal(e.target.value)
                }
                style={{ marginLeft: "10px" }}
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
                style={{ marginLeft: "10px" }}
            >
                Add Task
            </button>

            <hr />

            {tasks.map((task) => (
                <div
                    key={task.id}
                    style={{
                        marginBottom: "15px",
                    }}
                >
                    {editingId === task.id ? (
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
                                    updateTask(task.id)
                                }
                            >
                                Save
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={() =>
                                    !task.completed &&
                                    completeTask(task.id)
                                }
                                style={{
                                    marginRight: "10px",
                                    cursor:
                                        task.completed
                                            ? "default"
                                            : "pointer",
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
                                    color:
                                        task.completed
                                            ? "gray"
                                            : "black",
                                }}
                            >
                                {task.title}
                            </strong>

                            {task.completed && (
                                <span
                                    style={{
                                        marginLeft:
                                            "10px",
                                        color:
                                            "green",
                                    }}
                                >
                                    ✅ Completed
                                </span>
                            )}

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
                                    marginLeft:
                                        "10px",
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
                                    marginLeft:
                                        "10px",
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