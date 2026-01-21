-- Seed data for TripMaster
-- Run this AFTER schema.sql to populate initial data

DO $$
DECLARE
    trip_id UUID;
BEGIN
    -- Get or create the trip
    SELECT id INTO trip_id FROM trips WHERE name = 'Mysore and Bangalore Mini Trip' LIMIT 1;
    
    IF trip_id IS NULL THEN
        INSERT INTO trips (name, start_date, end_date) 
        VALUES ('Mysore and Bangalore Mini Trip', '2026-01-24', '2026-01-27')
        RETURNING id INTO trip_id;
    END IF;

    -- Insert default members
    INSERT INTO members (trip_id, name, planned_amount, given_amount) VALUES
        (trip_id, 'Sandy', 3000, 2000),
        (trip_id, 'Vicky', 3000, 2000),
        (trip_id, 'Abi', 3000, 2000),
        (trip_id, 'Lachu', 3000, 2000),
        (trip_id, 'Yuva', 3000, 2000),
        (trip_id, 'Kalai', 3000, 2000),
        (trip_id, 'Karthi', 3000, 2000);

    -- Insert default categories
    INSERT INTO categories (trip_id, name, planned_amount, actual_amount, color, icon) VALUES
        (trip_id, 'Transportation (Internal)', 0, 0, '#3B82F6', 'car'),
        (trip_id, 'Travel - Train/Bus', 1980, 0, '#8B5CF6', 'plane'),
        (trip_id, 'Activities Fun World', 4497, 4497, '#10B981', 'ticket'),
        (trip_id, 'Turf', 1000, 0, '#F59E0B', 'trophy'),
        (trip_id, 'Food Friday Night', 400, 0, '#EF4444', 'utensils'),
        (trip_id, 'Food Saturday', 2100, 0, '#EF4444', 'utensils'),
        (trip_id, 'Food Sunday', 2100, 0, '#EF4444', 'utensils'),
        (trip_id, 'Food Monday', 2100, 0, '#EF4444', 'utensils'),
        (trip_id, 'Tickets/Entry', 0, 0, '#06B6D4', 'ticket'),
        (trip_id, 'Drinks/Beverages', 0, 0, '#EC4899', 'coffee'),
        (trip_id, 'Emergency/Medical', 500, 0, '#DC2626', 'alert'),
        (trip_id, 'Entertainment', 0, 0, '#A855F7', 'music'),
        (trip_id, 'Tips/Service', 0, 0, '#84CC16', 'heart'),
        (trip_id, 'Souvenirs/Gifts', 0, 0, '#F97316', 'gift');

    RAISE NOTICE 'Seed data inserted successfully for trip: %', trip_id;
END $$;
