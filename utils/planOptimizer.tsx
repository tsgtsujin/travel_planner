interface Activity {
  _id: string;
  name: string;
  latitude: number;
  longitude: number;
}

function haversineDistance(a: Activity, b: Activity): number {
  const R = 6371; // км
  const dLat = ((b.latitude - a.latitude) * Math.PI) / 180;
  const dLon = ((b.longitude - a.longitude) * Math.PI) / 180;

  const lat1 = (a.latitude * Math.PI) / 180;
  const lat2 = (b.latitude * Math.PI) / 180;

  const aVal =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) *
      Math.sin(dLon / 2) *
      Math.cos(lat1) *
      Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(aVal), Math.sqrt(1 - aVal));
  return R * c;
}

// K-means clustering үйлдэл
function kMeans(activities: Activity[], k: number, maxIterations = 100): number[] {
  let centroids = activities
    .slice()
    .sort(() => 0.5 - Math.random())
    .slice(0, k);

  let assignments = new Array(activities.length).fill(-1);

  for (let iter = 0; iter < maxIterations; iter++) {
    let changed = false;

    // Үйлдлүүдийг хамгийн ойрын centroid-д хуваарилах
    for (let i = 0; i < activities.length; i++) {
      const distances = centroids.map((c) => haversineDistance(activities[i], c));
      const minIndex = distances.indexOf(Math.min(...distances));

      if (assignments[i] !== minIndex) {
        assignments[i] = minIndex;
        changed = true;
      }
    }

    if (!changed) break;

    for (let j = 0; j < k; j++) {
      const clusterPoints = activities.filter((_, idx) => assignments[idx] === j);
      if (clusterPoints.length === 0) continue;
      const avgLat = clusterPoints.reduce((sum, p) => sum + p.latitude, 0) / clusterPoints.length;
      const avgLon = clusterPoints.reduce((sum, p) => sum + p.longitude, 0) / clusterPoints.length;
      centroids[j] = { ...centroids[j], latitude: avgLat, longitude: avgLon };
    }
  }
  return assignments;
}

export function splitActivitiesByDays(
  activities: Activity[],
  startDate: Date,
  endDate: Date
): Activity[][] {
  const days = Math.max(
    1,
    Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24) + 1)
  );

  if (activities.length === 0) return [];

  // K-means кластерчлал хийх
  const clusterAssignments = kMeans(activities, days);

  // Өдөр тус бүрийн массив үүсгэх
  const result: Activity[][] = Array.from({ length: days }, () => []);

  clusterAssignments.forEach((clusterIdx, idx) => {
    if (clusterIdx >= 0 && clusterIdx < days) {
      result[clusterIdx].push(activities[idx]);
    }
  });
  return result;
}
