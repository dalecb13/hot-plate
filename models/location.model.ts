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
