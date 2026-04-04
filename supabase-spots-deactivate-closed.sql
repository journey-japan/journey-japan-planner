-- ============================================
-- Deactivate closed/suspended spots
-- Generated: 2026-04-03
-- Run this in Supabase SQL Editor
-- ============================================

-- Step 1: Add is_active column (default true so existing spots remain visible)
ALTER TABLE public.spots ADD COLUMN IF NOT EXISTS is_active BOOLEAN NOT NULL DEFAULT true;

-- Step 2: Deactivate closed spots
UPDATE public.spots SET is_active = false WHERE name_en = 'Oedo Onsen Monogatari';  -- Permanently closed Sep 2021
UPDATE public.spots SET is_active = false WHERE name_en = 'Robot Restaurant';        -- Closed since COVID, no reopening date
