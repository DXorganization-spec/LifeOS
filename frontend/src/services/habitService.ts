import api from "./api";

export interface Habit {
    id: string;
    title: string;
    description: string;
    frequency: string;
    goal_id: string;
}

export interface HabitCreate {
    title: string;
    description: string;
    frequency: string;
    goal_id: string;
}

export interface HabitUpdate {
    title: string;
    description: string;
    frequency: string;
}

export const getHabits = async (): Promise<Habit[]> => {
    const res = await api.get("/habits");
    return res.data;
};

export const createHabit = async (
    data: HabitCreate
): Promise<Habit> => {
    const res = await api.post("/habits", data);
    return res.data;
};

export const updateHabit = async (
    id: string,
    data: HabitUpdate
) => {
    const res = await api.put(`/habits/${id}`, data);
    return res.data;
};

export const deleteHabit = async (id: string) => {
    const res = await api.delete(`/habits/${id}`);
    return res.data;
};

export const completeHabit = async (id: string) => {
    const res = await api.post(`/habits/${id}/complete`);
    return res.data;
};

export const uncompleteHabit = async (id: string) => {
    const res = await api.delete(`/habits/${id}/complete`);
    return res.data;
};

export const getHabitHistory = async (id: string) => {
    const res = await api.get(`/habits/${id}/history`);
    return res.data;
};
