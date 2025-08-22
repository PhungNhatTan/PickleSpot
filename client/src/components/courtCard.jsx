import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function CourtCard({ court }) {
  const img = court.Photo?.[0]?.Url;
  return (
    <div style={{ border: "1px solid #eee", padding: 12, borderRadius: 8 }}>
      {img && <img src={img} alt={court.Name} style={{ width: "100%", height: 160, objectFit: "cover" }} />}
      <h3>{court.Name}</h3>
      <div>${court.Price} / hour</div>
      <div>{court.Covered ? "Covered" : "Open"} • {court.IsIndoor ? "Indoor" : "Outdoor"}</div>
      <div>Rating: {court.ratingAvg ?? "N/A"} ({court.ratingCount ?? 0})</div>
      <Link to={`/courts/${court.Id}`}>View details</Link>
    </div>
  );
}


CourtCard.propTypes = {
    court: PropTypes.func.isRequired,
};
