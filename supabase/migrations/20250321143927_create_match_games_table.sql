create table match_game (
  id bigint primary key generated always as identity,
  searchAddress varchar,
  country varchar,
  city varchar,
  budget int,
  categories varchar ARRAY null,
  locale varchar,
  createdAt timestamptz default now()
);
