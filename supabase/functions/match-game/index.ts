// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import { createClient, SupabaseClient } from 'jsr:@supabase/supabase-js@2'

import { corsHeaders } from "../_shared/cors.ts";

const UES_API_KEY = Deno.env.get('UES_API_KEY');
const MATCH_GAME_TABLE_NAME = 'match_game';

type CreateGameModel = {
  address: string
  country: string
  city: string
  budget: number
  categories: string[]
  locale: string
  isActive: boolean
}

const getAllGames = async (supabaseClient: SupabaseClient) => {
  const { data: games, error } = await supabaseClient.from(MATCH_GAME_TABLE_NAME)
    .select();

  if (error) throw error;

  return new Response(JSON.stringify({ games }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    status: 200,
  })
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
}

Deno.serve(async (req) => {
  const { url, method } = req
  console.log(`${url}, ${method}`);

  if (method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
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

    if (method === 'POST') {
      const body: CreateGameModel = await req.json();
      return await handleCreateGame(supabaseClient, body);
    } else {
      return await getAllGames(supabaseClient);
    }
  } catch (error) {
    console.error(error)

    return new Response(JSON.stringify(error), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/match-game' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
