import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";

interface LocationData {
  coords: {
    latitude: number;
    longitude: number;
  };
}

export default function HomeScreen() {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const mapRef = useRef<MapView | null>(null);

  useEffect(() => {
    const fetchLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      try {
        const location = await Location.getCurrentPositionAsync({});
        setLocation(location as LocationData);
      } catch (error) {
        setErrorMsg("Error getting current location");
      }
    };

    fetchLocation();
  }, []);

  useEffect(() => {
    if (location) {
      mapRef.current?.animateToRegion({
        ...location.coords,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      });
    }
  }, [location]);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  const { coords } = location || { coords: null };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        showsMyLocationButton
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
