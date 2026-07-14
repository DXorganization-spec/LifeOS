
"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";
import toast from "react-hot-toast";

interface Area {
    id: string;
    name: string;
}

export default function AreasPage() {
    const [areas, setAreas] = useState<Area[]>([]);
    const [name, setName] = useState("");

    const [editingId, setEditingId] =
        useState("");
    const [editName, setEditName] =
        useState("");

    useEffect(() => {
        fetchAreas();
    }, []);

    const fetchAreas = async () => {
        try {
            const response = await api.get("/areas");
            setAreas(response.data);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load areas.");
        }
    };
    const createArea = async () => {
        if (!name.trim()) {
            toast.error("Please enter an area name.");
            return;
        }

        try {
            await api.post("/areas", {
                name: name.trim(),
            });

            setName("");

            await fetchAreas();

            toast.success("Area created successfully!");
        } catch (error) {
            console.error(error);
            toast.error("Failed to create area.");
        }
    };

    const updateArea = async (areaId: string) => {
        if (!editName.trim()) {
            toast.error("Area name cannot be empty.");
            return;
        }

        try {
            await api.put(`/areas/${areaId}`, {
                name: editName.trim(),
            });

            setEditingId("");
            setEditName("");

            await fetchAreas();

            toast.success("Area updated successfully!");
        } catch (error) {
            console.error(error);
            toast.error("Failed to update area.");
        }
    };

        const deleteArea = async (areaId: string) => {
            const confirmed = window.confirm(
                "Delete this area?"
            );

            if (!confirmed) return;

            try {
                await api.delete(`/areas/${areaId}`);

                await fetchAreas();
                toast.success("Area deleted successfully!");
            } catch (error) {
                console.error(error);
                toast.error("Failed to delete area.");
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
                        marginBottom: "30px",
                    }}
                >
                    📂 Areas
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
                        placeholder="Area Name"
                        value={name}
                        onChange={(e) =>
                            setName(
                                e.target.value
                            )
                        }
                        style={{
                            flex: 1,
                            minWidth: "220px",
                            padding: "12px",
                            borderRadius:
                                "10px",
                            border:
                                "1px solid #374151",
                            background:
                                "#111827",
                            color: "white",
                        }}
                    />

                    <button
                        onClick={createArea}
                        disabled={!name.trim()}
                        style={{
                            padding: "12px 20px",
                            borderRadius: "10px",
                            border: "none",
                            background: name.trim() ? "#22c55e" : "#4b5563",
                            color: "white",
                            cursor: name.trim() ? "pointer" : "not-allowed",
                        }}
                    >
                        Add Area
                    </button>
                </div>

                {areas.map((area) => (
                    <div
                        key={area.id}
                        style={{
                            marginBottom:
                                "15px",
                            background:
                                "#111827",
                            border:
                                "1px solid #374151",
                            borderRadius:
                                "14px",
                            padding: "20px",
                        }}
                    >
                        {editingId ===
                            area.id ? (
                            <>
                                <input
                                    value={
                                        editName
                                    }
                                    onChange={(
                                        e
                                    ) =>
                                        setEditName(
                                            e.target
                                                .value
                                        )
                                    }
                                    style={{
                                        width:
                                            "100%",
                                        padding:
                                            "12px",
                                        borderRadius:
                                            "10px",
                                        border:
                                            "1px solid #374151",
                                        background:
                                            "#030712",
                                        color:
                                            "white",
                                        boxSizing:
                                            "border-box",
                                    }}
                                />

                                <div
                                    style={{
                                        display:
                                            "flex",
                                        flexWrap:
                                            "wrap",
                                        gap:
                                            "10px",
                                        marginTop:
                                            "15px",
                                    }}
                                >
                                    <button
                                        onClick={() =>
                                            updateArea(
                                                area.id
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
                                                "#22c55e",
                                            color:
                                                "white",
                                            cursor:
                                                "pointer",
                                        }}
                                    >
                                        Save
                                    </button>

                                    <button
                                        onClick={() => {
                                            setEditingId(
                                                ""
                                            );
                                            setEditName(
                                                ""
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
                                                "#6b7280",
                                            color:
                                                "white",
                                            cursor:
                                                "pointer",
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
                                        fontSize:
                                            "18px",
                                    }}
                                >
                                    {area.name}
                                </strong>

                                <div
                                    style={{
                                        display:
                                            "flex",
                                        flexWrap:
                                            "wrap",
                                        gap:
                                            "10px",
                                        marginTop:
                                            "15px",
                                    }}
                                >
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
                                            deleteArea(
                                                area.id
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

