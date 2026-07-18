"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "@/services/api";
import toast from "react-hot-toast";
import ListSkeleton from "@/components/skeletons/ListSkeleton";

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
    const [loading, setLoading] = useState(true);

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
        } finally {
            setLoading(false);
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
                                fontSize:
                                    "clamp(28px, 6vw, 40px)",
                                marginBottom: "10px",
                            }}
                        >
                            ✅ Tasks
                        </h1>
                    </motion.div>

                    <AnimatePresence>
                {showAchievement && (
                    <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 100 }}
                        transition={{ duration: 0.4 }}
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
                    </motion.div>
                )}
            </AnimatePresence>

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

                <motion.button
                    onClick={createTask}
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
                    Add Task
                </motion.button>
            </motion.div>

            <AnimatePresence mode="popLayout">
                {tasks.map((task) => (
                    <motion.div
                        key={task.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{
                            duration: 0.4,
                            ease: "easeOut",
                        }}
                        whileHover={
                            editingId !== task.id
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
                        {editingId === task.id ? (
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
                                        gap: "10px",
                                        marginTop: "15px",
                                        flexWrap: "wrap",
                                    }}
                                >
                                    <motion.button
                                        onClick={() =>
                                            updateTask(task.id)
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
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        flexWrap: "wrap",
                                        gap: "10px",
                                    }}
                                >
                                    <motion.button
                                        onClick={() =>
                                            !task.completed &&
                                            completeTask(task.id)
                                        }
                                        whileHover={
                                            !task.completed
                                                ? {
                                                      scale: 1.1,
                                                  }
                                                : {}
                                        }
                                        whileTap={
                                            !task.completed
                                                ? {
                                                      scale: 0.95,
                                                  }
                                                : {}
                                        }
                                        style={{
                                            cursor: task.completed
                                                ? "default"
                                                : "pointer",
                                            background: "transparent",
                                            border: "none",
                                            fontSize: "26px",
                                            color: "white",
                                        }}
                                    >
                                        {task.completed
                                            ? "☑"
                                            : "☐"}
                                    </motion.button>

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
                                        <motion.span
                                            initial={{
                                                opacity: 0,
                                                scale: 0.8,
                                            }}
                                            animate={{
                                                opacity: 1,
                                                scale: 1,
                                            }}
                                            transition={{
                                                duration: 0.3,
                                            }}
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
                                        </motion.span>
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
                                    <motion.button
                                        onClick={() => {
                                            setEditingId(
                                                task.id
                                            );
                                            setEditTitle(
                                                task.title
                                            );
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
                                    </motion.button>

                                    <motion.button
                                        onClick={() =>
                                            deleteTask(
                                                task.id
                                            )
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