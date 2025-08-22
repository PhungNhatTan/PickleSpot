import { useState } from "react";
import PropTypes from "prop-types";

export default function FilterPanel({ onSearch }) {
    const [v, setV] = useState({
        lat: "", lng: "", radiusKm: "",
        minPrice: "", maxPrice: "",
        covered: "", isIndoor: "",
        types: "", minRating: "",
        start: "", end: "",
    });

    const set = (k) => (e) => setV({ ...v, [k]: e.target.value });

    return (
        <div style={{ width: 320, padding: 12, borderRight: "1px solid #eee" }}>
            <h3>Filters</h3>
            <input placeholder="Latitude" value={v.lat} onChange={set("lat")} />
            <input placeholder="Longitude" value={v.lng} onChange={set("lng")} />
            <input placeholder="Radius (km)" value={v.radiusKm} onChange={set("radiusKm")} />
            <input placeholder="Min Price" value={v.minPrice} onChange={set("minPrice")} />
            <input placeholder="Max Price" value={v.maxPrice} onChange={set("maxPrice")} />
            <select value={v.covered} onChange={set("covered")}>
                <option value="">Covered?</option>
                <option value="true">Covered</option>
                <option value="false">Not covered</option>
            </select>
            <select value={v.isIndoor} onChange={set("isIndoor")}>
                <option value="">Indoor?</option>
                <option value="true">Indoor</option>
                <option value="false">Outdoor</option>
            </select>
            <input placeholder="Types (comma)" value={v.types} onChange={set("types")} />
            <input placeholder="Min Rating" value={v.minRating} onChange={set("minRating")} />
            <label>Start</label>
            <input type="datetime-local" value={v.start} onChange={set("start")} />
            <label>End</label>
            <input type="datetime-local" value={v.end} onChange={set("end")} />
            <button style={{ display: "block", marginTop: 8 }} onClick={() => onSearch(v)}>Search</button>
        </div>
    );
}

FilterPanel.propTypes = {
  onSearch: PropTypes.func.isRequired,
};