const RAPID_API_KEY = process.env.EXPO_PUBLIC_RAPID_API_KEY!;
const RAPID_API_HOST = process.env.EXPO_PUBLIC_RAPID_API_HOST!;

export type WorldCities = {
  city: string
  city_ascii: string
  lat: number
  lng: number
  country: string
  iso2: string
  iso3: string
  admin_name: string
  capital: string
  id: number
}

export const getRestaurants = async (address: string, country: string, city: string) => {
  const url = 'https://eater_ubereats.p.rapidapi.com/getUberEats';
  const searchParams = new URLSearchParams({
    address,
    country,
    city,
  });

  const response = await fetch(`${url}?${searchParams.toString()}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-rapidapi-host': RAPID_API_HOST,
      'x-rapidapi-key': RAPID_API_KEY,
    },
  });

  const json = await response.json();
  console.log('getRestaurants', json);
  return json;
}
