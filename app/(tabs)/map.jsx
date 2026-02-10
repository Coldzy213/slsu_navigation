import * as Location from "expo-location";
import { isPointInPolygon } from "geolib";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, View } from "react-native";
import MapView, { Marker, Polygon, PROVIDER_GOOGLE } from "react-native-maps";
import { CAMPUS_POLYGON } from "../../constants/campusData";

//npx expo install react-native-maps expo-location - package of the map
//npm install geolib - package paras pagcompare sa boundary

export default function CampusMap() {
  const [userLocation, setUserLocation] = useState(null);
  const [isInside, setIsInside] = useState(true);
  const [loading, setLoading] = useState(true);

  const CAMPUS_CENTER = {
    latitude: 10.3922,
    longitude: 124.9798,
    latitudeDelta: 0.003,
    longitudeDelta: 0.003,
  };

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
        { accuracy: Location.Accuracy.High, distanceInterval: 5 },
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

    setIsInside(!inside);

    if (inside) {
      setUserLocation(coords);
    } else {
      setUserLocation(null);
    }
  };

  if (loading) {
    return <ActivityIndicator style={{ flex: 1 }} size="large" />;
  }

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        mapType="hybrid"
        // Use 'camera' instead of 'initialRegion' for stricter control
        camera={{
          center: {
            latitude: 10.3922,
            longitude: 124.9798,
          },
          pitch: 0,
          heading: 0,
          altitude: 1000, // Zoom level for iOS
          zoom: 17, // Zoom level for Android
        }}
        // Strict interaction control
        scrollEnabled={isInside}
        zoomEnabled={isInside}
        pitchEnabled={true}
        rotateEnabled={false}
        // The Boundary limit
        mapBoundary={{
          northEast: { latitude: 10.3945, longitude: 124.9811 },
          southWest: { latitude: 10.3898, longitude: 124.9785 },
        }}
        // Modern zoom limits
        cameraZoomRange={{
          minCenterIdlingZoomLevel: 16,
          maxCenterIdlingZoomLevel: 20,
          animated: true,
        }}
        // This prevents the map from moving when clicking markers
        moveOnMarkerPress={true}
        showsUserLocation={isInside}
      >
        <Polygon
          coordinates={CAMPUS_POLYGON}
          fillColor="rgba(100, 200, 100, 0.2)"
          strokeColor="#2D5E2D"
          strokeWidth={3}
        />

        {userLocation && (
          <Marker
            coordinate={userLocation}
            title="You are here"
            pinColor="#2D5E2D"
          />
        )}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  map: { width: "80%", height: "80%" },
});
