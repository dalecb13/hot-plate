create table if not exists public.restaurants (
  id bigint primary key generated always as identity,
  restaurantName varchar,
  cityId bigint,
  restaurantCoords gis.geography(POINT) not null,
  createdAt timestamptz default now(),
  CONSTRAINT fk_restaurants
      FOREIGN KEY(cityId)
        REFERENCES cities(id)
);

create index restaurants_geo_index
  on public.restaurants
  using GIST (restaurantCoords);

create or replace function restaurants_in_view(min_lat float, min_long float, max_lat float, max_long float)
returns table (id public.restaurants.id%TYPE, restaurantName public.restaurants.restaurantName%TYPE, lat float, long float)
set search_path to ''
language sql
as $$
	select id, restaurantName, gis.st_y(location::gis.geometry) as lat, gis.st_x(location::gis.geometry) as long
	from public.restaurants
	where location operator(gis.&&) gis.ST_SetSRID(gis.ST_MakeBox2D(gis.ST_Point(min_long, min_lat), gis.ST_Point(max_long, max_lat)), 4326)
$$;
