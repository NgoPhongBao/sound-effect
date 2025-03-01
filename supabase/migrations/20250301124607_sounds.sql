
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
  is_deleted boolean default false not null,
  is_viral boolean default false not null,
  is_trending boolean default false not null,
  is_new boolean default false not null
);

-- Insert some sample data into the table
insert into sounds (title, duration, plays, downloads, category_id, url, is_deleted, is_viral, is_trending, is_new)
values
  ('Sound 1', 100, 1000, 100, 1, 'https://example.com/sound1.mp3', false, false, false, false),
  ('Sound 2', 200, 2000, 200, 2, 'https://example.com/sound2.mp3', false, false, false, false);

-- Enable row level security on the sounds table
alter table sounds enable row level security;

-- Allow authenticated users to select sounds
create policy "Public sounds are viewable by everyone." on sounds
  for select using (true);

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