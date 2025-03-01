-- Create the table
create table categories (
  id bigint primary key generated always as identity,
  name text not null,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null,
  is_deleted boolean default false not null,
  priority int default 0 not null
);

-- Insert some sample data into the table
insert into categories (name, is_deleted, created_at, updated_at, priority)
values
  ('Tiếng động vật', false, now(), now(), 0),
  ('Tiếng thú', false, now(), now(), 1),
  ('Tiếng chim', false, now(), now(), 2),
  ('Tiếng cá', false, now(), now(), 3);

alter table categories enable row level security;

-- Allow authenticated users to create categories
create policy "Enable insert for authenticated users only" 
on categories for insert 
to authenticated 
with check (true);

-- Allow authenticated users to update categories
create policy "Enable update for authenticated users only" 
on categories for update
to authenticated
using (true)
with check (true);

-- Allow authenticated users to delete categories
create policy "Enable delete for authenticated users only" 
on categories for delete
to authenticated
using (true);