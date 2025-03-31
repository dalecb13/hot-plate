alter table
if exists public.restaurants add categories varchar array default NULL;

alter table
if exists public.restaurants add budget int default 0;

alter table
if exists public.restaurants add imageUrl varchar default NULL;
