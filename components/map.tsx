import React, { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import MapView, { PROVIDER_DEFAULT } from "react-native-maps";
import { useLocationStore } from "store/location";
import { calculateRegion } from "lib/location";

const Map = () => {
  const {
    userLongitude,
    userLatitude,
  } = useLocationStore();

  const [ text, onChangeText ] = useState<string>('');

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
      showsUserLocation={false}
      userInterfaceStyle="light"
      zoomEnabled={true}
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
      <View style={localStyles.inputWrapper}>
        <TextInput
          style={localStyles.input}
          onChangeText={onChangeText}
          value={text}
        />
      </View>
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
  inputWrapper: {
    position: 'absolute',
    width: '100%',
    bottom: 56,
    margin: 8,
    paddingTop: 1,
    paddingBottom: 1,
    paddingRight: 2,
    paddingLeft: 2,
    backgroundColor: 'white',
    borderRadius: 16,
    opacity: 0.8,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    opacity: 50,
  },
});
