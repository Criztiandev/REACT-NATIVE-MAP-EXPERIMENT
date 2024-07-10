import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import useLocation from "@/hooks/useLocation";

interface LocationData {
  coords: {
    latitude: number;
    longitude: number;
  };
}

export default function HomeScreen() {
  const location = useLocation();
  return <View style={styles.container}></View>;
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
