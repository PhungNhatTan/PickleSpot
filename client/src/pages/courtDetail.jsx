import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function CourtDetail() {
    const { id } = useParams(); // expects route like /courts/1
    const [court, setCourt] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const fetchCourt = async () => {
            try {
                const res = await fetch(`http://localhost:3000/api/courts/${id}`);
                if (!res.ok) {
                    throw new Error("Failed to fetch court")
                }
                const data = await res.json();
                if (isMounted) {
                    setCourt(data)
                }
            } catch (err) {
                if (isMounted) {
                    setError(err.message)
                }
            } finally {
                if (isMounted) {
                    setLoading(false)
                }
            }
        };

        fetchCourt();

        return () => {
            isMounted = false;
        };
    }, [id]);

    if (loading) {
        return <p>Loading court details...</p>
    }
    if (error) {
        return <p style={{ color: "red" }}>{error}</p>
    }
    if (!court) {
        return <p>No court found.</p>

    }

    return (
        <div className="p-4 max-w-lg mx-auto">
            <h1 className="text-2xl font-bold">{court.name}</h1>
            <p className="text-gray-600">Price: ${court.price}</p>
            <p>
                Capacity: {court.capacity} players ·{" "}
                {court.isIndoor ? "Indoor" : "Outdoor"} ·{" "}
                {court.covered ? "Covered" : "Not Covered"}
            </p>
            {court.group && (
                <div className="mt-4">
                    <h2 className="text-xl font-semibold">Court Group</h2>
                    <p>{court.group.name}</p>
                    <p>{court.group.address}</p>
                </div>
            )}
            {court._avgRating !== null && court._avgRating !== undefined && (
                <p className="mt-4">
                    ⭐ Average Rating: {court._avgRating.toFixed(1)}
                </p>
            )}
            {court.ratings?.length > 0 && (
                <div className="mt-4">
                    <h2 className="text-lg font-semibold">User Reviews</h2>
                    <ul className="list-disc ml-5">
                        {court.ratings.map((r) => (
                            <li key={r.id}>
                                <strong>{r.account?.displayName || "Anonymous"}</strong>:{" "}
                                {r.score}/5 {r.comment && `- "${r.comment}"`}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default CourtDetail;