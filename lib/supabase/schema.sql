-- Supabase Schema Definition for Luxury Real Estate Platform

-- 1. Locations Table
CREATE TABLE IF NOT EXISTS locations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  city VARCHAR(255) NOT NULL,
  country VARCHAR(255) NOT NULL,
  address TEXT NOT NULL,
  latitude NUMERIC(10, 7),
  longitude NUMERIC(10, 7),
  neighborhood_overview TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Properties Table
CREATE TABLE IF NOT EXISTS properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  price NUMERIC(15, 2) NOT NULL,
  property_type VARCHAR(100) NOT NULL,
  bedrooms INT NOT NULL,
  bathrooms INT NOT NULL,
  area INT NOT NULL,
  status VARCHAR(50) DEFAULT 'available',
  is_featured BOOLEAN DEFAULT false,
  location_id UUID REFERENCES locations(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Floors Table
CREATE TABLE IF NOT EXISTS floors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  floor_number INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  total_units INT DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Floor Plans Table
CREATE TABLE IF NOT EXISTS floor_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  image TEXT NOT NULL,
  pdf_url TEXT,
  dimensions VARCHAR(100),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Apartments Table
CREATE TABLE IF NOT EXISTS apartments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  floor_id UUID REFERENCES floors(id) ON DELETE CASCADE,
  number VARCHAR(100) NOT NULL,
  floor_number INT NOT NULL,
  type VARCHAR(100) NOT NULL,
  bedrooms INT NOT NULL,
  bathrooms INT NOT NULL,
  bhk VARCHAR(50) NOT NULL,
  facing VARCHAR(50) NOT NULL,
  area_sqft INT NOT NULL,
  price NUMERIC(15, 2) NOT NULL,
  status VARCHAR(50) DEFAULT 'available',
  floor_plan_id UUID REFERENCES floor_plans(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Amenities Table
CREATE TABLE IF NOT EXISTS amenities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  description TEXT,
  icon_name VARCHAR(100),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Gallery Images Table
CREATE TABLE IF NOT EXISTS gallery_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  alt TEXT NOT NULL,
  caption TEXT,
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Enquiries Table
CREATE TABLE IF NOT EXISTS enquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID REFERENCES properties(id) ON DELETE SET NULL,
  property_name VARCHAR(255) NOT NULL,
  client_name VARCHAR(255) NOT NULL,
  client_email VARCHAR(255) NOT NULL,
  client_phone VARCHAR(100),
  message TEXT NOT NULL,
  preferred_contact_method VARCHAR(50) DEFAULT 'email',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for Query Performance
CREATE INDEX IF NOT EXISTS idx_properties_slug ON properties(slug);
CREATE INDEX IF NOT EXISTS idx_properties_status ON properties(status);
CREATE INDEX IF NOT EXISTS idx_apartments_floor_id ON apartments(floor_id);
CREATE INDEX IF NOT EXISTS idx_gallery_images_property_id ON gallery_images(property_id);
