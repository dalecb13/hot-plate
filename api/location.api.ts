import { CITIES_TABLE_NAME, COUNTRIES_TABLE_NAME } from "../constants/table-names";
import { supabase } from "../lib/supabase";
import { CityModel, CountryModel } from "../models/location.model";

export const getCountries = async () => {
const { data, error } = await supabase
    .from(COUNTRIES_TABLE_NAME)
    .select();

  if (error) {
    console.warn(error);
    return [];
  }

  return data as CountryModel[];
}

export const getCities = async (countryId: number) => {
  console.log('getCities', countryId)
  const { data, error } = await supabase
      .from(CITIES_TABLE_NAME)
      .select()
      .eq('countryId', countryId);
  
  if (error) {
    console.warn(error);
    return [];
  }

  return data as CityModel[];
}
