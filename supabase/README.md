# Supabase Database Setup

This folder contains SQL scripts to set up and manage your TripMaster database.

## 🚀 Fresh Setup (First Time)

1. Go to your Supabase project dashboard
2. Click on "SQL Editor" in the left sidebar
3. Run the scripts in this order:

```sql
-- Step 1: Create tables and schema
-- Copy and paste: schema.sql

-- Step 2: Insert initial data
-- Copy and paste: seed.sql
```

## 🔄 Reset Database (Start Over)

If you need to completely wipe and restart:

```sql
-- Step 1: Delete everything
-- Copy and paste: reset.sql

-- Step 2: Recreate tables
-- Copy and paste: schema.sql

-- Step 3: Add seed data
-- Copy and paste: seed.sql
```

## 📋 Schema Overview

### Tables

1. **trips** - Main trip information
   - `id` (UUID, Primary Key)
   - `name` (Text)
   - `start_date` (Date)
   - `end_date` (Date)
   - Timestamps

2. **members** - Trip participants and contributions
   - `id` (UUID, Primary Key)
   - `trip_id` (UUID, Foreign Key → trips)
   - `name` (Text)
   - `planned_amount` (Numeric)
   - `given_amount` (Numeric)
   - Timestamps

3. **categories** - Expense categories
   - `id` (UUID, Primary Key)
   - `trip_id` (UUID, Foreign Key → trips)
   - `name` (Text)
   - `planned_amount` (Numeric)
   - `actual_amount` (Numeric)
   - `color` (Text)
   - `icon` (Text)
   - Timestamps

4. **expenses** - Individual expenses
   - `id` (UUID, Primary Key)
   - `trip_id` (UUID, Foreign Key → trips)
   - `category_id` (UUID, Foreign Key → categories)
   - `title` (Text)
   - `amount` (Numeric)
   - `paid_by` (Text)
   - Timestamps

### Features

- ✅ Foreign key constraints with CASCADE DELETE
- ✅ Indexes for performance
- ✅ Row Level Security (RLS) enabled
- ✅ Real-time subscriptions enabled
- ✅ Automatic timestamps

## 🔒 Security Note

The current RLS policies allow ALL operations. For production, you should restrict based on authentication:

```sql
-- Example: Restrict to authenticated users only
CREATE POLICY "Authenticated users only" ON trips 
FOR ALL 
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');
```

## 🐛 Troubleshooting

### "Table already exists" error
Run `reset.sql` first to drop all tables, then run `schema.sql`.

### "Trip not found" in app
Make sure you ran `seed.sql` to create the default trip.

### Real-time not working
Check that the publication is enabled:
```sql
SELECT * FROM pg_publication_tables WHERE pubname = 'supabase_realtime';
```
