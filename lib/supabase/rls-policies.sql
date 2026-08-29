-- ============================================================
-- ROW LEVEL SECURITY POLICIES — Aureus Estates
-- Run this after schema.sql in Supabase SQL Editor
-- ============================================================

-- Enable RLS on all tables
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE apartments ENABLE ROW LEVEL SECURITY;
ALTER TABLE floors ENABLE ROW LEVEL SECURITY;
ALTER TABLE floor_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE amenities ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- PUBLIC READ POLICIES (anonymous + authenticated users)
-- ============================================================

-- Public can read published properties
CREATE POLICY "Public can read properties"
  ON properties FOR SELECT
  TO public
  USING (status IN ('available', 'reserved', 'sold'));

-- Public can read floors for published properties
CREATE POLICY "Public can read floors"
  ON floors FOR SELECT
  TO public
  USING (property_id IN (SELECT id FROM properties WHERE status IN ('available', 'reserved', 'sold')));

-- Public can read apartments for published properties
CREATE POLICY "Public can read apartments"
  ON apartments FOR SELECT
  TO public
  USING (true);

-- Public can read floor plans
CREATE POLICY "Public can read floor_plans"
  ON floor_plans FOR SELECT
  TO public
  USING (true);

-- Public can read amenities for published properties
CREATE POLICY "Public can read amenities"
  ON amenities FOR SELECT
  TO public
  USING (true);

-- Public can read gallery images
CREATE POLICY "Public can read gallery_images"
  ON gallery_images FOR SELECT
  TO public
  USING (true);

-- Public can read locations
CREATE POLICY "Public can read locations"
  ON locations FOR SELECT
  TO public
  USING (true);

-- Public can INSERT enquiries (submit contact forms)
CREATE POLICY "Public can submit enquiries"
  ON enquiries FOR INSERT
  TO public
  WITH CHECK (true);

-- ============================================================
-- ADMIN WRITE POLICIES (authenticated users only)
-- In production: scope to a specific admin role or user email
-- ============================================================

-- Admins can manage properties
CREATE POLICY "Admins can manage properties"
  ON properties FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Admins can manage floors
CREATE POLICY "Admins can manage floors"
  ON floors FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Admins can manage apartments
CREATE POLICY "Admins can manage apartments"
  ON apartments FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Admins can manage floor plans
CREATE POLICY "Admins can manage floor_plans"
  ON floor_plans FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Admins can manage amenities
CREATE POLICY "Admins can manage amenities"
  ON amenities FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Admins can manage gallery images
CREATE POLICY "Admins can manage gallery_images"
  ON gallery_images FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Admins can manage locations
CREATE POLICY "Admins can manage locations"
  ON locations FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Admins can read all enquiries (public cannot SELECT enquiries)
CREATE POLICY "Admins can read enquiries"
  ON enquiries FOR SELECT
  TO authenticated
  USING (true);

-- Admins can update/delete enquiries
CREATE POLICY "Admins can update enquiries"
  ON enquiries FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Admins can delete enquiries"
  ON enquiries FOR DELETE
  TO authenticated
  USING (true);
