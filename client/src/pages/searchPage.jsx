import { useState } from "react";
import { searchCourts } from "../api/courtsApi.js";
import FilterPanel from "../components/filterPanel.jsx";
import CourtCard from "../components/courtCard.jsx";
import { Link } from "react-router-dom";

export default function SearchPage() {
  const [courts, setCourts] = useState([]);

  async function handleSearch(filters) {
    // strip empty values
    const params = Object.fromEntries(
      Object.entries(filters).filter(([_, v]) => v !== "" && v !== null)
    );
    const data = await searchCourts(params);
    setCourts(data);
  }

  return (
    <div style={{ display: "flex" }}>
      <FilterPanel onSearch={handleSearch} />
      <div style={{ padding: 16, flex: 1 }}>
        <h2>Results ({courts.length})</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
          {courts.map(c => <CourtCard key={c.Id} court={c} />)}
        </div>
        <div style={{ marginTop: 16 }}>
          <Link to="/">Home</Link>
        </div>
      </div>
    </div>
  );
}
