import { calculateRegion } from "lib/location";
import { MarkerData } from "models/location.model";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import { useLocationStore } from "store/location";

const Map = () => {
  const {
    userLongitude,
    userLatitude,
  } = useLocationStore();
  // const { selectedDriver, setDrivers } = useDriverStore();

  // const { data: drivers, loading, error } = useFetch<Driver[]>("/(api)/driver");
  const [markers, setMarkers] = useState<MarkerData[]>([]);

  const region = calculateRegion({
    userLatitude,
    userLongitude,
  });

  // if (loading || (!userLatitude && !userLongitude))
  // if (!userLatitude && !userLongitude)
  //   return (
  //     <View className="flex justify-between items-center w-full">
  //       <ActivityIndicator size="small" color="#000" />
  //     </View>
  //   );

  // if (error)
  //   return (
  //     <View className="flex justify-between items-center w-full">
  //       <Text>Error: {error}</Text>
  //     </View>
  //   );

  return (
    <MapView
      style={localStyles.mapView}
      provider={PROVIDER_DEFAULT}
      tintColor="black"
      mapType="mutedStandard"
      showsPointsOfInterest={false}
      initialRegion={region}
      showsUserLocation={true}
      userInterfaceStyle="light"
    >
      {/* {markers.map((marker, index) => (
        <Marker
          key={marker.id}
          coordinate={{
            latitude: marker.latitude,
            longitude: marker.longitude,
          }}
          title={marker.title}
          image={
            selectedDriver === +marker.id ? icons.selectedMarker : icons.marker
          }
        />
      ))} */}
    </MapView>
  );
};

export default Map;

const localStyles = StyleSheet.create({
  mapView: {
    // w-full h-full rounded-2xl
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
});
