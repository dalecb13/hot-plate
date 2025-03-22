-- Create a dedicated separate schema
create schema if not exists "gis";

-- Example: enable the "postgis" extension
create extension postgis with schema "gis";

create table if not exists public.cities (
  id bigint primary key generated always as identity,
  countryId int,
  cityName varchar,
  cityCoords gis.geography(POINT) not null,
  createdAt timestamptz default now(),
  CONSTRAINT fk_cities
      FOREIGN KEY(countryId)
        REFERENCES countries(id)
);

create index cities_geo_index
  on public.cities
  using GIST (cityCoords);
