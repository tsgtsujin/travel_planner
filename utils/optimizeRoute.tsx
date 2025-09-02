interface Activity {
  _id: string;
  name: string;
  latitude: number;
  longitude: number;
  imageUrl?: string[];
}

// Haversine function
function haversineDistance(a: Activity, b: Activity): number {
  const R = 6371;
  const dLat = ((b.latitude - a.latitude) * Math.PI) / 180;
  const dLon = ((b.longitude - a.longitude) * Math.PI) / 180;
  const lat1 = (a.latitude * Math.PI) / 180;
  const lat2 = (b.latitude * Math.PI) / 180;

  const aVal =
    Math.sin(dLat / 2) ** 2 +
    Math.sin(dLon / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(aVal), Math.sqrt(1 - aVal));
  return R * c;
}

// Нийт уртыг тооцох функц
function calculateTotalDistance(route: Activity[]): number {
  let total = 0;
  for (let i = 1; i < route.length; i++) {
    total += haversineDistance(route[i - 1], route[i]);
  }
  return total;
}

// Permutations (recursive)
function permute<T>(arr: T[]): T[][] {
  if (arr.length <= 1) return [arr];

  const result: T[][] = [];
  for (let i = 0; i < arr.length; i++) {
    const current = arr[i];
    const remaining = [...arr.slice(0, i), ...arr.slice(i + 1)];
    const perms = permute(remaining);
    perms.forEach(p => result.push([current, ...p]));
  }
  return result;
}

// TSP шийдэл
export function getOptimizedRoute(dayActivities: Activity[]): {
  ordered: Activity[];
  distances: number[];
  durations: number[];
  totalDistance: number;
  totalDuration: number;
} {
  if (dayActivities.length <= 1) {
    return {
      ordered: [...dayActivities],
      distances: [],
      durations: [],
      totalDistance: 0,
      totalDuration: 0,
    };
  }

  // TSP: бүх permutation-ыг үзэх
  const permutations = permute(dayActivities);
  let minDistance = Infinity;
  let bestRoute: Activity[] = [];

  for (const route of permutations) {
    const dist = calculateTotalDistance(route);
    if (dist < minDistance) {
      minDistance = dist;
      bestRoute = route;
    }
  }

  // Хамгийн сайн маршрутын зайнууд
  const distances: number[] = [];
  const durations: number[] = [];
  for (let i = 1; i < bestRoute.length; i++) {
    const dist = haversineDistance(bestRoute[i - 1], bestRoute[i]);
    distances.push(dist);
    durations.push(dist / 50); // 50км/ц хурд гэж үзье
  }

  const totalDuration = durations.reduce((a, b) => a + b, 0);

  return {
    ordered: bestRoute,
    distances,
    durations,
    totalDistance: minDistance,
    totalDuration,
  };
}