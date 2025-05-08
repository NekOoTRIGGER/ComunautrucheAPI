// PingTest.tsx
import { useEffect, useState } from "react";

const API_BASE = "https://localhost:44353/api";

export default function PingTest() {
    const [message, setMessage] = useState("");

    useEffect(() => {
        const pingApi = async () => {
            try {
                const res = await fetch(`${API_BASE}/test/ping`);
                if (!res.ok) throw new Error("Erreur API");
                const data = await res.json();
                setMessage(data.message);
            } catch (error: any) {
                setMessage("Erreur : " + error.message);
            }
        };

        pingApi();
    }, []);

    return (
        <div className="p-4">
            <h2>Test API</h2>
            <p>Réponse : {message}</p>
        </div>
    );
}