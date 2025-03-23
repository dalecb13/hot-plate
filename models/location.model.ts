export type Coords = {
  longitude: number
  latitude: number
}

export type CountryModel = {
  id: number
  createdAt: string
  countryName: string
  capitalName: string
  countryIso2: string
  countryIso3: string
  ueId: number
}

export type CityModel = {
  id: number
  cityName: string
  lat: number
  lng: number
  countryId: number
  createdAt: string
}

import { TextInputProps, TouchableOpacityProps } from "react-native";

export interface MarkerData {
  latitude: number;
  longitude: number;
  id: number;
  title: string;
  profile_image_url: string;
  car_image_url: string;
  car_seats: number;
  rating: number;
  first_name: string;
  last_name: string;
  time?: number;
  price?: string;
}

declare interface MapProps {
  onMapReady?: () => void;
}

declare interface ButtonProps extends TouchableOpacityProps {
  title: string;
  bgVariant?: "primary" | "secondary" | "danger" | "outline" | "success";
  textVariant?: "primary" | "default" | "secondary" | "danger" | "success";
  IconLeft?: React.ComponentType<any>;
  IconRight?: React.ComponentType<any>;
  className?: string;
}

declare interface GoogleInputProps {
  icon?: string;
  initialLocation?: string;
  containerStyle?: string;
  textInputBackgroundColor?: string;
  handlePress: ({
    latitude,
    longitude,
    address,
  }: {
    latitude: number;
    longitude: number;
    address: string;
  }) => void;
}

declare interface InputFieldProps extends TextInputProps {
  label: string;
  icon?: any;
  secureTextEntry?: boolean;
  labelStyle?: string;
  containerStyle?: string;
  inputStyle?: string;
  iconStyle?: string;
  className?: string;
}

declare interface PaymentProps {
  fullName: string;
  email: string;
  amount: string;
  rideTime: number;
}

export interface LocationStore {
  userLatitude: number | null;
  userLongitude: number | null;
  userAddress: string | null;
  // destinationLatitude: number | null;
  // destinationLongitude: number | null;
  // destinationAddress: string | null;
  setUserLocation: ({
    latitude,
    longitude,
    address,
  }: {
    latitude: number;
    longitude: number;
    address: string;
  }) => void;
  // setDestinationLocation: ({
  //   latitude,
  //   longitude,
  //   address,
  // }: {
  //   latitude: number;
  //   longitude: number;
  //   address: string;
  // }) => void;
}
