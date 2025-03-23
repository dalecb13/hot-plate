create table if not exists public.ues (
  id bigint primary key generated always as identity,
  request json,
  response json,
  createdAt timestamptz default now(),
  updatedAt timestamptz default now()
);