-- DANGER: This will DELETE ALL data and reset the database
-- Use this ONLY when you want to start completely fresh

-- Drop all tables
DROP TABLE IF EXISTS expenses CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS members CASCADE;
DROP TABLE IF EXISTS trips CASCADE;

-- Confirmation message
SELECT 'All tables dropped successfully. Run schema.sql to recreate them.' AS message;
