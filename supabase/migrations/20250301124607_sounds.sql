
-- Create the sounds table
create table sounds (
  id bigint primary key generated always as identity,
  title text not null,
  duration int not null,
  plays int not null,
  downloads int not null,
  category_id bigint not null,
  url text not null,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null,
  is_deleted boolean default false not null
);

-- Enable row level security on the sounds table
alter table sounds enable row level security;

-- Allow authenticated users to insert sounds
create policy "Enable insert for authenticated users only" 
on sounds for insert 
to authenticated 
with check (true);
    
-- Allow authenticated users to update sounds
create policy "Enable update for authenticated users only" 
on sounds for update 
to authenticated 
using (true)
with check (true);

-- Allow authenticated users to delete sounds
create policy "Enable delete for authenticated users only" 
on sounds for delete 
to authenticated 
using (true);