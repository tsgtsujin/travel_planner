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
  
  export function findOptimalRoute(activities: Activity[]): Activity[] {
    if (activities.length === 0) return [];
  
    const visited: Set<string> = new Set();
    const route: Activity[] = [];
    let current = activities[0];
  
    route.push(current);
    visited.add(current._id);
  
    while (route.length < activities.length) {
      let nearest = null;
      let minDist = Infinity;
  
      for (const activity of activities) {
        if (!visited.has(activity._id)) {
          const dist = haversineDistance(current, activity);
          if (dist < minDist) {
            minDist = dist;
            nearest = activity;
          }
        }
      }
  
      if (nearest) {
        visited.add(nearest._id);
        route.push(nearest);
        current = nearest;
      }
    }
  
    return route;
  }
  