// Haversine formula to get real-world distance in meters
export const getDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371e3; // Earth's radius
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
};

// Finds the closest predefined node to your current GPS
export const findNearestNode = (userLocation, nodes) => {
  let nearestId = null;
  let minDistance = Infinity;
  Object.keys(nodes).forEach((id) => {
    const d = getDistance(
      userLocation.latitude,
      userLocation.longitude,
      nodes[id].latitude,
      nodes[id].longitude,
    );
    if (d < minDistance) {
      minDistance = d;
      nearestId = id;
    }
  });
  return nearestId;
};
