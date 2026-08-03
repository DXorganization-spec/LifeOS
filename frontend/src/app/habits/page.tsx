"use client";

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import {
    Habit,
    getHabits,
} from "@/services/habitService";

import HabitForm from "@/components/habits/HabitForm";
import HabitCard from "@/components/habits/HabitCard";
import HabitSkeleton from "@/components/skeletons/HabitSkeleton";

import {
    PageTransition,
    FadeIn,
    AnimatedCard,
    StaggerContainer,
    StaggerItem,
} from "@/components/animations";

export default function HabitsPage() {
    const [habits, setHabits] = useState<Habit[]>([]);
    const [loading, setLoading] = useState(true);

    const [completedToday, setCompletedToday] =
        useState<string[]>([]);

    const [editingHabit, setEditingHabit] =
        useState<Habit | null>(null);
    const fetchHabits = async () => {
        try {
            setLoading(true);

            const data = await getHabits();

            setHabits(data);

            // We'll replace this with backend data later
            setCompletedToday([]);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load habits.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHabits();
    }, []);

    const refreshHabits = () => {
        fetchHabits();
    };
    return (
        <PageTransition>
            <FadeIn>
                <AnimatedCard>
                    <div
                        style={{
                            maxWidth: "1000px",
                            margin: "0 auto",
                            padding: "24px",
                        }}
                    >
                        <h1
                            style={{
                                color: "white",
                                fontSize: "32px",
                                marginBottom: "24px",
                            }}
                        >
                            🔥 Habits
                        </h1>

                        <HabitForm
                            onHabitCreated={refreshHabits}
                        />

                        {loading ? (
                            <HabitSkeleton />
                        ) : habits.length === 0 ? (
                            <div
                                style={{
                                    textAlign: "center",
                                    padding: "40px",
                                    color: "#9ca3af",
                                    border: "1px dashed #374151",
                                    borderRadius: "12px",
                                }}
                            >
                                <h2>No Habits Yet</h2>
                                <p>
                                    Create your first habit to
                                    start building consistency.
                                </p>
                            </div>
                        ) : (
                            <StaggerContainer>
                                {habits.map((habit) => (
    <StaggerItem key={habit.id}>
        <HabitCard
            habit={habit}
            completed={completedToday.includes(habit.id)}
            onRefresh={refreshHabits}
            onEdit={setEditingHabit}
        />
    </StaggerItem>
))}
</StaggerContainer>
)}
                    </div>
                </AnimatedCard>
            </FadeIn>
        </PageTransition>
    );
}