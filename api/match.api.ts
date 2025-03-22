import { FunctionsFetchError, FunctionsHttpError, FunctionsRelayError } from "@supabase/supabase-js";
import { MATCH_TABLE_NAME } from "constants/table-names";
import { supabase } from "lib/supabase";
import { MatchModel } from "models/match.model";

export type CreateGameModel = {
  address: string
  country: string
  city: string
  budget: number
  categories: string[]
  locale: string
}

export const getMatchGames = async (): Promise<MatchModel[]> => {
  const { data, error } = await supabase.from(MATCH_TABLE_NAME)
    .select();

  if (error) {
    console.warn(error);
    return [];
  }

  return data as MatchModel[];
}

export const createMatch = async (createGameModel: CreateGameModel) => {
  console.log('createMatch', createGameModel);

  const { data, error: restaurantsInViewError } = await supabase.rpc('restaurants_in_view', {
    min_lat: 40.807,
    min_long: -73.946,
    max_lat: 40.808,
    max_long: -73.945,
  });

  const { error: createMatchError } = await supabase.from(MATCH_TABLE_NAME)
    .insert({
      address: createGameModel.address,
      country: createGameModel.address,
      city: createGameModel.city,
      budget: createGameModel.budget,
      categories: createGameModel.categories,
    });

  if (createMatchError) {
    console.warn(createMatchError);
  }

  // check restaurant table for distance

  // const { data, error } = await supabase.functions.invoke('match-game', {
  //   body: {
  //     address: createGameModel.address,
  //     country: createGameModel.country,
  //     city: createGameModel.city,
  //     budget: createGameModel.budget,
  //     categories: createGameModel.categories,
  //     locale: createGameModel.locale,
  //   },
  // });

  // if (error instanceof FunctionsHttpError) {
  //   const errorMessage = await error.context.json();
  //   console.log('Function returned an error', errorMessage);
  // } else if (error instanceof FunctionsRelayError) {
  //   console.log('Relay error:', error.message);
  // } else if (error instanceof FunctionsFetchError) {
  //   console.log('Fetch error:', error.message);
  // } else {
  //   console.warn('General error:', error);
  //   return;
  // }

  // console.log(data);
  // return data;
}
