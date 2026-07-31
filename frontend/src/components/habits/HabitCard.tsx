"use client";

import { motion } from "framer-motion";
import toast from "react-hot-toast";
import type { Habit } from "@/services/habitService";

import {
    completeHabit,
    uncompleteHabit,
    deleteHabit,
} from "@/services/habitService";


interface HabitCardProps {
    habit: Habit;
    completed: boolean;
    onRefresh: () => void;
    onEdit: (habit: Habit) => void;
}

export default function HabitCard({
    habit,
    completed,
    onRefresh,
    onEdit,
}: HabitCardProps) {
    const handleComplete = async () => {
        try {
            if (completed) {
                await uncompleteHabit(habit.id);
                toast.success("Habit unchecked.");
            } else {
                await completeHabit(habit.id);
                toast.success("Habit completed!");
            }

            onRefresh();
        } catch (error) {
            console.error(error);
            toast.error("Failed to update habit.");
        }
    };

    const handleDelete = async () => {
        const confirmed = window.confirm(
            "Delete this habit?"
        );

        if (!confirmed) return;

        try {
            await deleteHabit(habit.id);

            toast.success("Habit deleted.");

            onRefresh();
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete habit.");
        }
    };
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            whileHover={{
                y: -4,
                scale: 1.01,
                boxShadow: "0 10px 30px rgba(34,197,94,0.15)",
            }}
            transition={{
                duration: 0.35,
                ease: "easeOut",
            }}
            style={{
                background: "#111827",
                border: "1px solid #374151",
                borderRadius: "14px",
                padding: "20px",
                marginBottom: "16px",
            }}
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "12px",
                }}
            >
                <h3
                    style={{
                        margin: 0,
                        color: "white",
                        fontSize: "20px",
                    }}
                >
                    {habit.title}
                </h3>

                <span
                    style={{
                        background: "#22c55e22",
                        color: "#22c55e",
                        padding: "6px 12px",
                        borderRadius: "999px",
                        fontSize: "13px",
                        fontWeight: 600,
                    }}
                >
                    {habit.frequency}
                </span>
            </div>

            {habit.description && (
                <p
                    style={{
                        color: "#9ca3af",
                        lineHeight: 1.6,
                        marginBottom: "18px",
                    }}
                >
                    {habit.description}
                </p>
            )}

            <div
                style={{
                    display: "flex",
                    gap: "10px",
                    flexWrap: "wrap",
                }}
            >
                <motion.button
                    onClick={handleComplete}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                        padding: "10px 18px",
                        border: "none",
                        borderRadius: "10px",
                        background: completed ? "#f59e0b" : "#22c55e",
                        color: "white",
                        cursor: "pointer",
                        fontWeight: 600,
                    }}
                >
                    {completed ? "↩ Undo" : "✓ Complete"}
                </motion.button>

                <motion.button
                    onClick={() => onEdit(habit)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                        padding: "10px 18px",
                        border: "none",
                        borderRadius: "10px",
                        background: "#2563eb",
                        color: "white",
                        cursor: "pointer",
                        fontWeight: 600,
                    }}
                >
                    ✏ Edit
                </motion.button>

                <motion.button
                    onClick={handleDelete}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                        padding: "10px 18px",
                        border: "none",
                        borderRadius: "10px",
                        background: "#dc2626",
                        color: "white",
                        cursor: "pointer",
                        fontWeight: 600,
                    }}
                >
                    🗑 Delete
                </motion.button>
            </div>
        </motion.div>
    );
}