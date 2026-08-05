"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import api from "@/services/api";
import {
    createHabit,
    updateHabit,
    type Habit,
    type HabitCreate,
} from "@/services/habitService";

interface Goal {
    id: string;
    title: string;
}

interface HabitFormProps {
    onHabitCreated: () => void;
    editingHabit: Habit | null;
    clearEditing: () => void;
}

export default function HabitForm({
    onHabitCreated,
    editingHabit,
    clearEditing,
}: HabitFormProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [frequency, setFrequency] =
        useState("Daily");

    const [goalId, setGoalId] =
        useState("");

    const [goals, setGoals] =
        useState<Goal[]>([]);

    const [loading, setLoading] =
        useState(false);

    useEffect(() => {
        fetchGoals();
    }, []);

    useEffect(() => {
        console.log("editingHabit =", editingHabit);

        if (!editingHabit) return;

        setTitle(editingHabit.title);
        setDescription(editingHabit.description ?? "");
        setFrequency(editingHabit.frequency);
        setGoalId(editingHabit.goal_id);
    }, [editingHabit]);

    const fetchGoals = async () => {
        try {
            const response = await api.get<Goal[]>("/goals");

            setGoals(response.data);

            if (response.data.length > 0) {
                setGoalId(response.data[0].id);
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to load goals.");
        }
    };

    const handleCreateHabit = async () => {
        if (!title.trim()) {
            toast.error("Please enter a habit title.");
            return;
        }

        if (!goalId) {
            toast.error("Please select a goal.");
            return;
        }

        try {
            setLoading(true);

            const habitData: HabitCreate = {
                title: title.trim(),
                description: description.trim(),
                frequency,
                goal_id: goalId,
            };

            if (editingHabit) {
                await updateHabit(editingHabit.id, {
                    title: habitData.title,
                    description: habitData.description,
                    frequency: habitData.frequency,
                });

                toast.success("Habit updated successfully!");
                clearEditing();
            } else {
                await createHabit(habitData);
                toast.success("Habit created successfully!");
            }

            setTitle("");
            setDescription("");
            setFrequency("Daily");

            if (goals.length > 0) {
                setGoalId(goals[0].id);
            }

            onHabitCreated();
        } catch (error) {
            console.error(error);
            toast.error(
                editingHabit
                    ? "Failed to update habit."
                    : "Failed to create habit."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.5,
                ease: "easeOut",
            }}
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "14px",
                background: "#111827",
                border: "1px solid #374151",
                borderRadius: "16px",
                padding: "20px",
                marginBottom: "25px",
            }}
        >
            <input
                type="text"
                placeholder="Habit Title"
                value={title}
                onChange={(e) =>
                    setTitle(e.target.value)
                }
                style={{
                    padding: "12px",
                    borderRadius: "10px",
                    border: "1px solid #374151",
                    background: "#030712",
                    color: "white",
                }}
            />

            <textarea
                placeholder="Description (optional)"
                value={description}
                onChange={(e) =>
                    setDescription(e.target.value)
                }
                rows={3}
                style={{
                    padding: "12px",
                    borderRadius: "10px",
                    border: "1px solid #374151",
                    background: "#030712",
                    color: "white",
                    resize: "vertical",
                }}
            />
            <select
                value={goalId}
                onChange={(e) => setGoalId(e.target.value)}
                style={{
                    padding: "12px",
                    borderRadius: "10px",
                    border: "1px solid #374151",
                    background: "#030712",
                    color: "white",
                }}
            >
                <option value="">Select Goal</option>

                {goals.map((goal) => (
                    <option
                        key={goal.id}
                        value={goal.id}
                    >
                        {goal.title}
                    </option>
                ))}
            </select>

            <select
                value={frequency}
                onChange={(e) =>
                    setFrequency(e.target.value)
                }
                style={{
                    padding: "12px",
                    borderRadius: "10px",
                    border: "1px solid #374151",
                    background: "#030712",
                    color: "white",
                }}
            >
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
            </select>

            <motion.button
                onClick={handleCreateHabit}
                disabled={
                    loading ||
                    !title.trim() ||
                    !goalId
                }
                whileHover={{
                    scale: 1.03,
                }}
                whileTap={{
                    scale: 0.97,
                }}
                style={{
                    padding: "12px",
                    border: "none",
                    borderRadius: "10px",
                    background: "#22c55e",
                    color: "white",
                    cursor:
                        loading ||
                            !title.trim() ||
                            !goalId
                            ? "not-allowed"
                            : "pointer",
                    fontWeight: 600,
                }}
            >
                {loading
                    ? editingHabit
                        ? "Updating..."
                        : "Creating..."
                    : editingHabit
                        ? "Update Habit"
                        : "Add Habit"}
            </motion.button>
        </motion.div>
    );
}