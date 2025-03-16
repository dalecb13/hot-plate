import * as Location from "expo-location";
import { Dispatch, SetStateAction } from "react";

export const setCurrentLocationIfAvailable = async (
  setLocation: Dispatch<SetStateAction<Location.LocationObjectCoords>>,
  setIsLocationUnavailable: Dispatch<SetStateAction<boolean>>,
) => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    setIsLocationUnavailable(true);
    return;
  }

  try {
    const currentLocation = await Location.getCurrentPositionAsync({});
    setLocation(currentLocation.coords);
  } catch (_e) {
    setIsLocationUnavailable(true);
  }
};

const defaultLocation = {
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
}

const madridMetropolisLocation = {
  // 40.41888345878195, -3.697263222049402
  latitude: 40.41888345878195,
  longitude: -3.697263222049402,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
}

export const calculateRegion = ({
  userLatitude,
  userLongitude,
  destinationLatitude,
  destinationLongitude,
}: {
  userLatitude: number | null;
  userLongitude: number | null;
  destinationLatitude?: number | null;
  destinationLongitude?: number | null;
}) => {
  if (!userLatitude || !userLongitude) {
    return madridMetropolisLocation;
  }

  if (!destinationLatitude || !destinationLongitude) {
    return {
      latitude: userLatitude,
      longitude: userLongitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };
  }

  const minLat = Math.min(userLatitude, destinationLatitude);
  const maxLat = Math.max(userLatitude, destinationLatitude);
  const minLng = Math.min(userLongitude, destinationLongitude);
  const maxLng = Math.max(userLongitude, destinationLongitude);

  const latitudeDelta = (maxLat - minLat) * 1.3; // Adding some padding
  const longitudeDelta = (maxLng - minLng) * 1.3; // Adding some padding

  const latitude = (userLatitude + destinationLatitude) / 2;
  const longitude = (userLongitude + destinationLongitude) / 2;

  return {
    latitude,
    longitude,
    latitudeDelta,
    longitudeDelta,
  };
};
