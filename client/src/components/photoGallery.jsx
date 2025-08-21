import PropTypes from "prop-types";

export default function PhotoGallery({ photos = [] }) {
    if (!photos.length) {
        return null
    };
    return (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 }}>
            {photos.map(p => (
                <img key={p.Id} src={p.Url} alt="" style={{ width: "100%", height: 140, objectFit: "cover" }} />
            ))}
        </div>
    );
}

PhotoGallery.propTypes = {
    photos: PropTypes.func.isRequired,
};
