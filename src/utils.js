import proj4 from 'proj4';

export const convertCoords = coordinates =>
  proj4('EPSG:3857').forward(coordinates);

export const convertARSpace = (current, objLocation) => {
  const devicePoint = convertCoords(current);
  const objPoint = convertCoords(objLocation);
  // latitude(north,south) maps to the z axis in AR
  // longitude(east, west) maps to the x axis in AR
  const _z = objPoint[1] - devicePoint[1];
  const x = objPoint[0] - devicePoint[0];
  //flip the z, as negative z(is in front of us which is north, pos z is behind(south).
  const z = _z !== 0 ? -_z : 0;
  return Object.assign([x, z], { x, z });
};

export const latLongToMerc = (latDeg, longDeg) => {
  // From: https://gist.github.com/scaraveos/5409402
  const longRad = (longDeg / 180.0) * Math.PI;
  const latRad = (latDeg / 180.0) * Math.PI;
  const smA = 6378137.0;
  const xmeters = smA * longRad;
  const ymeters = smA * Math.log((Math.sin(latRad) + 1) / Math.cos(latRad));
  return { x: xmeters, y: ymeters };
};

export function getDistanceBetweenTwoPoints(cord1, cord2) {
  if (
    cord1.latitude === cord2.latitude &&
    cord1.longitude === cord2.longitude
  ) {
    return 0;
  }

  const radlat1 = (Math.PI * cord1.latitude) / 180;
  const radlat2 = (Math.PI * cord2.latitude) / 180;

  const theta = cord1.longitude - cord2.longitude;
  const radtheta = (Math.PI * theta) / 180;

  let dist =
    Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);

  if (dist > 1) {
    dist = 1;
  }

  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515;
  dist = dist * 1.609344; //convert miles to km

  return dist;
}
export const calculateDistance = (pointA, pointB) => {
  // http://www.movable-type.co.uk/scripts/latlong.html
  const lat1 = pointA.latitude;
  const lon1 = pointA.longitude;

  const lat2 = pointB.latitude;
  const lon2 = pointB.longitude;

  const R = 6371e3; // earth radius in meters
  const φ1 = lat1 * (Math.PI / 180);
  const φ2 = lat2 * (Math.PI / 180);
  const Δφ = (lat2 - lat1) * (Math.PI / 180);
  const Δλ = (lon2 - lon1) * (Math.PI / 180);

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * (Math.sin(Δλ / 2) * Math.sin(Δλ / 2));

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c;
  return distance; // in meters
};
export const distanceBetweenPoints = (p1, p2) => {
  if (!p1 || !p2) {
    return 0;
  }

  const R = 6371; // Radius of the Earth in km
  const dLat = ((p2.latitude - p1.latitude) * Math.PI) / 180;
  const dLon = ((p2.longitude - p1.longitude) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((p1.latitude * Math.PI) / 180) *
      Math.cos((p2.latitude * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d;
};

function calcDistance(fromLat, fromLng, toLat, toLng) {
  return window.google.maps.geometry.spherical.computeDistanceBetween(
    new window.google.maps.LatLng(fromLat, fromLng),
    new window.google.maps.LatLng(toLat, toLng),
  );
}

export const match = (term, array, key) => {
  const reg = new RegExp(term.split('').join('.*'), 'i');
  return array.filter(item => item[key] && item[key].match(reg));
};
