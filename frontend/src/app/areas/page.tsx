"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";

interface Area {
    id: string;
    name: string;
}

export default function AreasPage() {
    const [areas, setAreas] = useState<Area[]>([]);
    const [name, setName] = useState("");

    const [editingId, setEditingId] = useState("");
    const [editName, setEditName] = useState("");

    useEffect(() => {
        fetchAreas();
    }, []);

    const fetchAreas = async () => {
        try {
            const response = await api.get("/areas");
            setAreas(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const createArea = async () => {
        try {
            await api.post("/areas", {
                name,
            });

            setName("");
            fetchAreas();
        } catch (error) {
            console.error(error);
        }
    };

    const updateArea = async (areaId: string) => {
        try {
            await api.put(`/areas/${areaId}`, {
                name: editName,
            });

            setEditingId("");
            setEditName("");

            fetchAreas();
        } catch (error) {
            console.error(error);
        }
    };

    const deleteArea = async (areaId: string) => {
        const confirmed = window.confirm(
            "Delete this area?"
        );

        if (!confirmed) return;

        try {
            await api.delete(`/areas/${areaId}`);

            fetchAreas();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Areas</h1>

            <input
                type="text"
                placeholder="Area Name"
                value={name}
                onChange={(e) =>
                    setName(e.target.value)
                }
            />

            <button
                onClick={createArea}
                style={{ marginLeft: "10px" }}
            >
                Add Area
            </button>

            <hr />

            {areas.map((area) => (
                <div
                    key={area.id}
                    style={{
                        marginBottom: "15px",
                    }}
                >
                    {editingId === area.id ? (
                        <>
                            <input
                                value={editName}
                                onChange={(e) =>
                                    setEditName(
                                        e.target.value
                                    )
                                }
                            />

                            <button
                                onClick={() =>
                                    updateArea(area.id)
                                }
                                style={{
                                    marginLeft: "10px",
                                }}
                            >
                                Save
                            </button>

                            <button
                                onClick={() => {
                                    setEditingId("");
                                    setEditName("");
                                }}
                                style={{
                                    marginLeft: "10px",
                                }}
                            >
                                Cancel
                            </button>
                        </>
                    ) : (
                        <>
                            <strong>{area.name}</strong>

                            <button
                                onClick={() => {
                                    setEditingId(
                                        area.id
                                    );
                                    setEditName(
                                        area.name
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
                                    deleteArea(
                                        area.id
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