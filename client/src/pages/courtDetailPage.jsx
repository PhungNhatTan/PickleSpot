import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getCourt } from "../api/courtsApi.js";
import PhotoGallery from "../components/photoGallery.jsx";

export default function CourtDetailPage() {
    const { id } = useParams();
    const [court, setCourt] = useState(null);

    useEffect(() => { (async () => setCourt(await getCourt(id)))(); }, [id]);
    if (!court) {
        return <div>Loading...</div>;
    }

    const services = court.Group?.CourtGroupService?.map(s => ({
        id: s.Id,
        name: s.Service?.Name,
        price: s.Price,
        available: s.IsAvailable
    })) || [];

    return (
        <div style={{ padding: 16 }}>
            <Link to="/">← Back</Link>
            <h1>{court.Name}</h1>
            <div>Price: ${court.Price} / hour</div>
            <div>{court.Covered ? "Covered" : "Open"} • {court.IsIndoor ? "Indoor" : "Outdoor"}</div>
            <div>Rating: {court.ratingAvg ?? "N/A"} ({court.ratingCount ?? 0})</div>

            <h3 style={{ marginTop: 16 }}>Photos</h3>
            <PhotoGallery photos={court.Photo} />

            <h3 style={{ marginTop: 16 }}>Location</h3>
            <div>{court.Group?.Address}</div>
            <div>Lat/Lng: {court.Group?.Latitude}, {court.Group?.Longitude}</div>
            <p style={{ maxWidth: 640 }}>{court.Group?.Description}</p>

            <h3 style={{ marginTop: 16 }}>Additional Services</h3>
            <ul>
                {services.length ? services.map(s => (
                    <li key={s.id}>
                        {s.name} — {s.available ? "Available" : "Unavailable"}{s.price !== null ? ` — $${s.price}` : ""}
                    </li>
                )) : <i>No extra services.</i>}
            </ul>
        </div>
    );
}
