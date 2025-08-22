// basic radius helper (deg approximation). For production, prefer PostGIS or proper Haversine SQL.
export function latLngBox(lat, lng, radiusKm = 5) {
  const kmPerDegLat = 110.574;
  const kmPerDegLng = 111.320 * Math.cos((lat * Math.PI) / 180);
  const dLat = radiusKm / kmPerDegLat;
  const dLng = radiusKm / kmPerDegLng;
  return {
    minLat: lat - dLat,
    maxLat: lat + dLat,
    minLng: lng - dLng,
    maxLng: lng + dLng,
  };
}
