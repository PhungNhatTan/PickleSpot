const BASE = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

export async function apiGet(path, params) {
    const q = params ? `?${new URLSearchParams(params).toString()}` : "";
    const r = await fetch(`${BASE}${path}${q}`);
    if (!r.ok) {
        throw new Error(await r.text())
    };
    return r.json();
}
