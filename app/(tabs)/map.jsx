import * as Location from "expo-location";
import { isPointInPolygon } from "geolib";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, {
  Marker,
  Polygon,
  Polyline,
  PROVIDER_GOOGLE,
} from "react-native-maps";

// Your custom imports
import { CAMPUS_POLYGON } from "../../constants/campusData";
import { EDGES, NODES } from "../../constants/navigationData";
import { runDijkstra } from "../../utils/dijkstra";
import { findNearestNode } from "../../utils/geoUtils";

export default function CampusMap() {
  const [userLocation, setUserLocation] = useState(null);
  const [isInside, setIsInside] = useState(true);
  const [loading, setLoading] = useState(true);
  const [route, setRoute] = useState([]);
  const [destinationName, setDestinationName] = useState("");

  useEffect(() => {
    let subscription;

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission denied", "Location access is required.");
        setLoading(false);
        return;
      }

      let initialLoc = await Location.getCurrentPositionAsync({});
      checkLocation(initialLoc.coords);
      setLoading(false);

      subscription = await Location.watchPositionAsync(
        { accuracy: Location.Accuracy.High, distanceInterval: 2 },
        (location) => checkLocation(location.coords),
      );
    })();

    return () => subscription?.remove();
  }, []);

  const checkLocation = (coords) => {
    const inside = isPointInPolygon(
      { latitude: coords.latitude, longitude: coords.longitude },
      CAMPUS_POLYGON,
    );

    setIsInside(inside);
    setUserLocation(coords);
  };

  const handleNavigation = (targetNodeId) => {
    if (!userLocation) {
      Alert.alert(
        "Waiting for GPS",
        "Please wait until your location is detected.",
      );
      return;
    }

    // 1. Find the closest node to the user's live GPS
    const startNodeId = findNearestNode(userLocation, NODES);

    // 2. Run the Dijkstra Algorithm
    const pathIds = runDijkstra(startNodeId, targetNodeId, EDGES);

    // 3. Convert path IDs to coordinates
    const routeCoords = pathIds.map((id) => ({
      latitude: NODES[id].latitude,
      longitude: NODES[id].longitude,
    }));

    // 4. Update the state to draw the line
    setRoute([
      { latitude: userLocation.latitude, longitude: userLocation.longitude },
      ...routeCoords,
    ]);
    setDestinationName(NODES[targetNodeId].label);
  };

  if (loading) {
    return (
      <ActivityIndicator style={{ flex: 1 }} size="large" color="#2D5E2D" />
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        mapType="hybrid"
        camera={{
          center: { latitude: 10.3922, longitude: 124.9798 },
          pitch: 0,
          heading: 0,
          altitude: 1000,
          zoom: 17,
        }}
        // Still using your restriction logic
        scrollEnabled={isInside}
        zoomEnabled={isInside}
        minZoomLevel={16}
        maxZoomLevel={20}
        showsUserLocation={true}
      >
        {/* Campus Boundary */}
        <Polygon
          coordinates={CAMPUS_POLYGON}
          fillColor="rgba(100, 200, 100, 0.2)"
          strokeColor="#2D5E2D"
          strokeWidth={3}
        />

        {/* The Navigation Route Line */}
        {route.length > 0 && (
          <Polyline
            coordinates={route}
            strokeColor="#4CAF50"
            strokeWidth={5}
            lineJoin="round"
          />
        )}

        {/* Markers for Navigation Nodes/Buildings */}
        {Object.keys(NODES).map(
          (key) =>
            NODES[key].label && (
              <Marker
                key={key}
                coordinate={{
                  latitude: NODES[key].latitude,
                  longitude: NODES[key].longitude,
                }}
                title={NODES[key].label}
                onPress={() => handleNavigation(key)}
                pinColor="#2D5E2D"
              />
            ),
        )}
      </MapView>

      {/* Navigation UI Overlay */}
      <View style={styles.overlay}>
        <Text style={styles.statusText}>
          {isInside ? "📍 On Campus" : "❌ Outside SLSU Boundary"}
        </Text>
        {destinationName && (
          <View style={styles.routeInfo}>
            <Text style={styles.destText}>Going to: {destinationName}</Text>
            <TouchableOpacity
              onPress={() => {
                setRoute([]);
                setDestinationName("");
              }}
              style={styles.cancelBtn}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { width: "100%", height: "100%" },
  overlay: {
    position: "absolute",
    bottom: 30,
    left: 20,
    right: 20,
    alignItems: "center",
  },
  statusText: {
    backgroundColor: "rgba(255,255,255,0.9)",
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 20,
    marginBottom: 10,
    overflow: "hidden",
    fontWeight: "bold",
  },
  routeInfo: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    elevation: 5,
  },
  destText: { fontWeight: "bold", fontSize: 14, color: "#333" },
  cancelBtn: { backgroundColor: "#d32f2f", padding: 8, borderRadius: 6 },
});
