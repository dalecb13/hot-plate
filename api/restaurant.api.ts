import { Region } from "lib/location";
import { supabase } from "lib/supabase";
import uesMockResponse from '../data/ues_response_en_es.json';

const UES_TABLE_NAME = 'ues_table';
const UES_URL = 'https://uber-eats-scraper-api.p.rapidapi.com/api/job';
const MAX_ROWS = 100;
const TIMEOUT_MILLIS = 25000;
const MOCK_RESPONSE_FILE_PATH = '../data/ues_response_en_es.json';

type UESParameters = {
  maxRows: number
  query: string
  address: string
  locale: string
  page: number
}

const handleError = (supabase: any, message: string) => {
  if (!process.env.PRODUCTION) {
    console.log(message);
  } else {
    // TODO: attempt to log to Supabase
    console.warn('NOT YET IMPLEMENTED');
  }
}

const fetchUesMock = async () => {
  console.log('mocking for', TIMEOUT_MILLIS);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(uesMockResponse);
    }, TIMEOUT_MILLIS);
  });
}

const handleFetchUES = async (uesParameters: UESParameters) => {
  // store request
  // const { error } = await supabase.from(UES_TABLE_NAME)
  //   .insert({
  //     request: uesParameters,
  //   });

  let data
  if (!process.env.PRODUCTION) {
    console.log('Using mock data!');
    data = await fetchUesMock();
    console.log('Got mock data', data);
  } else {
    console.log('Requesting data from UES!');
    try {
      const response = await fetch(UES_URL, {
        body: JSON.stringify({
          scraper: {
            maxRows: MAX_ROWS,
            query: uesParameters.query,
            address: uesParameters.address,
            locale: uesParameters.locale,
            page: 1,
          },
        }),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-rapidapi-host': process.env.EXPO_PUBLIC_UBER_EATS_SCRAPER_HOST!,
          'x-rapidapi-key': process.env.EXPO_PUBLIC_UBER_EATS_SCRAPER_API_KEY!,
          // 'Authorization': `Bearer ${process.env.}`
        },
      });
  
      data = await response.text();
    } catch (error) {
      console.warn(error);
    }
  }

  return data;

  // store response
  // const { uesStoreError } = await supabase.from(UES_TABLE_NAME)
  //   .update({
  //     response: uesResult,
  //   })
  //   .where({
  //     request: uesParameters,
  //   });

  // if (uesStoreError) {
  //   console.warn('Error storing response in Supabase; bubbling response')
  //   await handleError(supabase, uesStoreError);
  // }

  // return response
}

export const getRestaurants = async (region: Region, address: string, locale: string) => {
  let min_lat, min_long, max_lat, max_long;
  if (region.latitudeDelta > 0) {
    min_lat = region.latitude;
    max_lat = region.latitude + region.latitudeDelta;
    console.log('region.latitudeDelta > 0', min_lat, max_lat)
  } else {
    min_lat = region.latitude + region.latitudeDelta;
    max_lat = region.latitude;
    console.log('region.latitudeDelta < 0', min_lat, max_lat)
  }

  if (region.longitudeDelta > 0) {
    min_long = region.longitude;
    max_long = region.longitude + region.longitudeDelta;
    console.log('region.longitudeDelta > 0', min_long, max_long)
  } else {
    min_long = region.longitude + region.longitudeDelta;
    max_long = region.longitude;
    console.log('region.longitudeDelta < 0', min_long, max_long)
  }

  const { data, error } = await supabase.rpc('restaurants_in_box', {
    min_lat,
    min_long,
    max_lat,
    max_long,
  });

  if (error) {
    console.warn(error);
  }

  if (!data) {
    console.log('no data; fetching from UES');
    const uesParameters: UESParameters = {
      maxRows: 100,
      query: 'Pizza',
      address,
      locale,
      page: 1,
    }
    const uesResult = await handleFetchUES(uesParameters);
    console.log('uesResult', uesResult);
  }
}
