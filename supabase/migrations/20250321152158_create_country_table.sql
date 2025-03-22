create table countries (
  id bigint primary key generated always as identity,
  countryName varchar,
  capitalName varchar,
  countryIso2 varchar,
  countryIso3 varchar,
  ueId int,
  createdAt timestamptz default now()
);
