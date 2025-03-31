// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import { createClient, SupabaseClient } from "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { corsHeaders } from "./supabase/functions/_shared/cors.ts";

const ERROR_TABLE_NAME = 'errors';
const MATCH_GAME_TABLE_NAME = 'match_game';
const RESTAURANTS_TABLE_NAME = 'restaurants';
const CONSTANTS_TABLE_NAME = 'constants';
const CONSTANTS_UES_KEY = 'ues';
const CONSTANTS_EXISTING_SIMILARITY_KEY = 'similarity_ratio';

const UES_TABLE_NAME = 'ues_table';

const UES_URL = 'https://uber-eats-scraper-api.p.rapidapi.com/api/job';
const UES_API_KEY = Deno.env.get('UES_API_KEY');
const UES_RAPIDAPI_HOST = 'uber-eats-scraper-api.p.rapidapi.com';

type CreateGameModel = {
  address: string
  country: string
  city: string
  budget: number
  categories: string[]
  locale: string
}

type UESParameters = {
  maxRows: number
  query: string
  address: string
  locale: string
  page: number
}

type UESScraperData = {
  scraper: UESParameters
}

type UESGeoObject = {
  city: string
  country: string
  neighborhood: string
  region: string
}

type UESRating = {
  ratingValue: number
  reviewCount: string
}

type UESSectionHours = {
  startTime: number
  endTime: number
  sectionTitle: string
}

type UESHours = {
  dayRange: string
  sectionHours: UESSectionHours[]
}

type UESLocation = {
  address: string
  streetAddress: string
  city: string
  country: string
  postalCode: string
  region: string
  latitude: number
  longitude: number
  geo: UESGeoObject
  locationType: string
}

type UESCategoriesLink = {
  text: string
  link: string
}

type UESCatalogItem = {
  title: string
  titleBadge: string
  itemDescription: string
  price: number
  priceTagline: string
  isSoldOut: boolean
  isAvailable: boolean
  hasCustomizations: boolean
  labelPrimary: string
  numAlcoholicItems?: number
  endorsement?: string
}

type UESMenu = {
  catalogName: string
  catalogItems: UESCatalogItem[]
  catalogSectionPosition: number
}

type UESRestaurantData = {
  title: string
  sanitizedTitle: string
  phoneNumber: string
  cuisineList: string[]
  location: UESLocation
  currencyCode: string
  rating: UESRating
  etaRange: string
  hours: UESHours[]
  categories: string[]
  categoriesLink: UESCategoriesLink[]
  menu: UESMenu[]
}

type UESReturnValue = {
  hasMorePage: boolean
  currentPage: number
  data: UESRestaurantData[]
}

type UESResponse = {
  state: string
  name: string
  data: UESScraperData
  id: string
  progress: number
  returnvalue: UESReturnValue
  delay: number
  priority: number
  attemptsStarted: number
  attemptsMade: number
  timestamp: number
  finishedOn: number
  processedOn: number
}

const handleError = async (supabaseClient: SupabaseClient, error: any) => {
  const { e } = await supabaseClient.from(ERROR_TABLE_NAME)
    .insert({
      error,
    });

  if (e) {
    console.warn('Error storing error in Supabase');
  }
}

const handleFetchUES = async (supabaseClient: SupabaseClient, uesParameters: UESParameters) => {
  // store request
  const { error } = await supabaseClient.from(UES_TABLE_NAME)
    .insert({
      request: uesParameters,
    });

  const { data } = await supabaseClient.from(CONSTANTS_TABLE_NAME)
    .select();

  if (error) {
    console.warn('Error storing request in Supabase; proceeding with request to UES anyway')
    await handleError(supabaseClient, error);
  }

  // send request
  const uesResult = await fetch(UES_URL, {
    body: {
      maxRows: data[`${CONSTANTS_UES_KEY}`].maxRows,
      query: uesParameters.query,
      address: uesParameters.address,
      locale: uesParameters.locale,
      page: 1
    },
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-rapidapi-host': UES_RAPIDAPI_HOST,
      'x-rapidapi-key': UES_API_KEY,
      // 'Authorization': `Bearer ${}`
    },
  });

  if (uesResult.status !== 200) {
    console.warn('Request for UES was not successful', uesResult);
  }

  // store response
  const { uesStoreError } = await supabaseClient.from(UES_TABLE_NAME)
    .update({
      response: uesResult,
    })
    .where({
      request: uesParameters,
    });

  if (uesStoreError) {
    console.warn('Error storing response in Supabase; bubbling response')
    await handleError(supabaseClient, uesStoreError);
  }

  // return response
  return uesResult;
}

const handleCreateGame = async (supabaseClient: SupabaseClient, createGameModel: CreateGameModel) => {
  const { error } = await supabaseClient.from(MATCH_GAME_TABLE_NAME)
    .insert({
      address: createGameModel.address,
      country: createGameModel.address,
      city: createGameModel.city,
      budget: createGameModel.budget,
      categories: createGameModel.categories,
    });

  // TODO: check data in tables

  // Get data from UES service
  const uesConstants = await supabaseClient.from(CONSTANTS_TABLE_NAME)
    .select(CONSTANTS_UES_KEY);
  const uesParameters: UESParameters = {
    maxRows: uesConstants.maxRows,
    query: createGameModel.categories[0],
    address: createGameModel.address,
    locale: createGameModel.locale,
    page: 1,
  }
  const uesResult = await handleFetchUES(supabaseClient, uesParameters);

  // TODO: apply user's filters (budget)
  // budget is the first array item in uesResult.returnvalue.data[].categories
  //    ONLY IF uesResult.returnvalue.data[].cuisineList.length < uesResult.returnvalue.data[].categories.length
  // else we have to calculate it

  // store restaurant data
  // const mapped = uesResult
  return uesResult;
}

Deno.serve(async (req) => {
  const { name, url, method } = await req.json()
  console.log('edge function', url)

  if (method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Create a Supabase client with the Auth context of the logged in user.
    const supabaseClient = createClient(
      // Supabase API URL - env var exported by default.
      Deno.env.get('SUPABASE_URL') ?? '',
      // Supabase API ANON KEY - env var exported by default.
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      // Create client with Auth context of the user that called the function.
      // This way your row-level-security (RLS) policies are applied.
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    );

    if (method === 'POST' || method === 'PUT') {
      const createGameModel: CreateGameModel = await req.json();
      console.log('Creating game', createGameModel);
      const createGameResult = await handleCreateGame(supabaseClient, createGameModel);
      console.log(createGameResult);
    }

  } catch (error) {
    console.error('main error', error)

    return new Response(JSON.stringify({ error }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }

  const data = {
    message: `Hello ${name}!`,
  }

  return new Response(
    JSON.stringify(data),
    { headers: { "Content-Type": "application/json" } },
  )
})

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/match-game' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
