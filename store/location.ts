import { LocationStore } from "models/location.model";
import { create } from "zustand";

export const useLocationStore = create<LocationStore>((set) => ({
  userLatitude: null,
  userLongitude: null,
  userAddress: null,
  destinationLatitude: null,
  destinationLongitude: null,
  destinationAddress: null,
  setUserLocation: ({
    latitude,
    longitude,
    address,
  }: {
    latitude: number;
    longitude: number;
    address: string;
  }) => {
    set(() => ({
      userLatitude: latitude,
      userLongitude: longitude,
      userAddress: address,
    }));
  },

//   setDestinationLocation: ({
//     latitude,
//     longitude,
//     address,
//   }: {
//     latitude: number;
//     longitude: number;
//     address: string;
//   }) => {
//     set(() => ({
//       destinationLatitude: latitude,
//       destinationLongitude: longitude,
//       destinationAddress: address,
//     }));

//     // if driver is selected and now new location is set, clear the selected driver
//     const { selectedDriver, clearSelectedDriver } = useDriverStore.getState();
//     if (selectedDriver) clearSelectedDriver();
//   },
}));
