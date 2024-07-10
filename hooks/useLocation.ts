import { useEffect, useState } from "react";

import * as Location from "expo-location";

const useLocation = () => {
  const [location, setLocation] = useState<
    Location.LocationObjectCoords | Location.LocationObject | null
  >(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    let subscriber: Location.LocationSubscription | undefined;
    (async () => {
      // Ask for permission
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      // getting the current location
      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation.coords);

      // this is for watching the location from the map
      subscriber = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 10000,
          distanceInterval: 10,
        },
        // Update the location if there is new
        (newLocation) => setLocation(newLocation)
      );
    })();

    // clean up

    return () => {
      if (subscriber) {
        subscriber.remove();
      }
    };
  }, []);

  return { location, errorMsg };
};

export default useLocation;
