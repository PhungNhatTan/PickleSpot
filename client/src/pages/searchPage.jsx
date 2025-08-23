import { useState, useEffect } from 'react';
import { searchCourts } from '../api/court';

export default function CourtSearchPage() {
  const [query, setQuery] = useState('');
  const [courts, setCourts] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [userLocation, setUserLocation] = useState(null);
  const [locationError, setLocationError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await searchCourts(query);
      setCourts(data);
    };
    fetchData();
  }, [query]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
        },
        () => {
          setLocationError(true); // permission denied or error
        },
      );
    } else {
      setLocationError(true); // geolocation not supported
    }
  }, []);

  // Sort client-side
  const sorted = [...courts].sort((a, b) => {
    if (sortBy === 'price') {
      const avgA = a.courts.reduce((sum, c) => sum + c.Price, 0) / a.courts.length;
      const avgB = b.courts.reduce((sum, c) => sum + c.Price, 0) / b.courts.length;
      return sortOrder === 'asc' ? avgA - avgB : avgB - avgA;
    }

    if (sortBy === 'rating') {
      const avgA =
        a.courts.flatMap((c) => c.CourtRating).reduce((s, r) => s + r.Score, 0)
        / (a.courts.flatMap((c) => c.CourtRating).length || 1);
      const avgB =
        b.courts.flatMap((c) => c.CourtRating).reduce((s, r) => s + r.Score, 0)
        / (b.courts.flatMap((c) => c.CourtRating).length || 1);
      return sortOrder === 'asc' ? avgA - avgB : avgB - avgA;
    }

    if (sortBy === 'distance') {
      if (userLocation) {
        const distA = haversineDistance(
          userLocation.lat,
          userLocation.lng,
          a.latitude,
          a.longitude,
        );
        const distB = haversineDistance(
          userLocation.lat,
          userLocation.lng,
          b.latitude,
          b.longitude,
        );
        return sortOrder === 'asc' ? distA - distB : distB - distA;
      }

      // No user location → keep default order
      return 0;
    }

    return sortOrder === 'asc'
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name);
  });

  // Paginate client-side
  const startIndex = (page - 1) * pageSize;
  const paginated = sorted.slice(startIndex, startIndex + pageSize);

  return (
    <div>
      <input
        type="text"
        placeholder="Search location"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="name">Name</option>
        <option value="price">Price</option>
        <option value="rating">Rating</option>
        <option value="distance">Distance</option>
      </select>

      <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
        <option value="asc">Asc</option>
        <option value="desc">Desc</option>
      </select>

      {locationError && sortBy === 'distance' && (
        <p style={{ color: 'red' }}>
          ⚠ Location not available. Distance sorting is disabled.
        </p>
      )}

      {paginated.map((group) => (
        <div key={group.id} className="card">
          <h3>{group.name}</h3>
          <p>{group.address}</p>
          <ul>
            {group.courts.map((court) => (
              <li key={court.Id}>
                {court.Name} – {court.Price} VND
              </li>
            ))}
          </ul>
        </div>
      ))}

      <button
        type="button"
        disabled={page === 1}
        onClick={() => setPage((p) => p - 1)}
      >
        Prev
      </button>
      <button
        type="button"
        disabled={startIndex + pageSize >= sorted.length}
        onClick={() => setPage((p) => p + 1)}
      >
        Next
      </button>
    </div>
  );
}

// Haversine formula to calculate distance between two lat/lng points
function haversineDistance(lat1, lon1, lat2, lon2) {
  const toRad = (x) => (x * Math.PI) / 180;

  const R = 6371; // km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2)
    + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2))
    * Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // distance in km
}
