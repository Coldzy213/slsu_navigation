import { getDistance } from "../utils/geoUtils";

export const NODES = {
  // Buildings (Converted from your DMS coordinates)
  admin: {
    id: "admin",
    latitude: 10.390917,
    longitude: 124.980333,
    label: "Admin/FCIS",
  },
  gad: {
    id: "gad",
    latitude: 10.390639,
    longitude: 124.98025,
    label: "GAD Building",
  },
  hrtm: {
    id: "hrtm",
    latitude: 10.390528,
    longitude: 124.979944,
    label: "HRTM Building",
  },
  drafting: {
    id: "drafting",
    latitude: 10.390167,
    longitude: 124.979806,
    label: "Drafting Tech",
  },
  supply: {
    id: "supply",
    latitude: 10.390139,
    longitude: 124.980111,
    label: "Supply Building",
  },
  common_service: {
    id: "common_service",
    latitude: 10.390194,
    longitude: 124.979417,
    label: "Common Service",
  },
  it4: {
    id: "it4",
    latitude: 10.390472,
    longitude: 124.979306,
    label: "Ind. Tech 4",
  },
  it3: {
    id: "it3",
    latitude: 10.390667,
    longitude: 124.979278,
    label: "Ind. Tech 3",
  },
  it2: {
    id: "it2",
    latitude: 10.390861,
    longitude: 124.97925,
    label: "Ind. Tech 2",
  },
  it1: {
    id: "it1",
    latitude: 10.391028,
    longitude: 124.979222,
    label: "Ind. Tech 1",
  },

  // Intersections (From your decimal coordinates)
  int1: { id: "int1", latitude: 10.391122, longitude: 124.980103 },
  int2: { id: "int2", latitude: 10.391108, longitude: 124.980812 },
  int3: { id: "int3", latitude: 10.390271, longitude: 124.980074 },
  int4: { id: "int4", latitude: 10.390333, longitude: 124.979146 },
  int5: { id: "int5", latitude: 10.391167, longitude: 124.978947 },
  int6: { id: "int6", latitude: 10.391897, longitude: 124.978864 },
};

const rawEdges = {
  // Connect buildings to the nearest intersection/road
  admin: ["int1", "gad"],
  gad: ["admin", "hrtm"],
  hrtm: ["int3", "gad"],
  drafting: ["int3", "supply"],
  supply: ["drafting", "int3"],
  it1: ["int5", "it2"],
  it2: ["it1", "it3"],
  it3: ["it2", "it4", "int4"],
  it4: ["it3", "common_service"],
  common_service: ["it4", "int4"],

  // Connect the intersections together to form the "road network"
  int1: ["admin", "int2", "int5"],
  int2: ["int1"],
  int3: ["hrtm", "supply", "drafting", "int4"],
  int4: ["int3", "it3", "common_service", "int5"],
  int5: ["int1", "int4", "int6", "it1"],
  int6: ["int5"],
};

// Automate the distance calculation
export const EDGES = Object.keys(rawEdges).reduce((acc, key) => {
  acc[key] = {};
  rawEdges[key].forEach((neighbor) => {
    acc[key][neighbor] = getDistance(
      NODES[key].latitude,
      NODES[key].longitude,
      NODES[neighbor].latitude,
      NODES[neighbor].longitude,
    );
  });
  return acc;
}, {});
