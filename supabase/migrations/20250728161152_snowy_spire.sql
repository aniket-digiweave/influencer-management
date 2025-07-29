/*
  # Influencer Management System Schema

  1. New Tables
    - `influencers`
      - `id` (uuid, primary key)
      - `name` (text)
      - `username` (text, unique)
      - `email` (text)
      - `phone` (text)
      - `platform` (text)
      - `followers` (integer)
      - `engagement_rate` (decimal)
      - `category` (text)
      - `location` (text)
      - `status` (text)
      - `profile_image` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `brands`
      - `id` (uuid, primary key)
      - `name` (text)
      - `owner_name` (text)
      - `email` (text)
      - `phone` (text)
      - `industry` (text)
      - `logo` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `campaigns`
      - `id` (uuid, primary key)
      - `influencer_id` (uuid, foreign key)
      - `brand_id` (uuid, foreign key)
      - `name` (text)
      - `amount` (decimal)
      - `shoot_date` (date)
      - `notes` (text)
      - `approved` (boolean)
      - `post_link` (text)
      - `paid_amount` (decimal)
      - `paid_date` (date)
      - `status` (text)
      - `type` (text)
      - `payment_status` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `notifications`
      - `id` (uuid, primary key)
      - `type` (text)
      - `title` (text)
      - `message` (text)
      - `read` (boolean)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create influencers table
CREATE TABLE IF NOT EXISTS influencers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  username text UNIQUE,
  email text,
  phone text,
  platform text,
  followers integer DEFAULT 0,
  engagement_rate decimal(5,2) DEFAULT 0,
  category text,
  location text,
  status text DEFAULT 'active',
  profile_image text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create brands table
CREATE TABLE IF NOT EXISTS brands (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  owner_name text,
  email text,
  phone text,
  industry text,
  logo text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create campaigns table
CREATE TABLE IF NOT EXISTS campaigns (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  influencer_id uuid REFERENCES influencers(id) ON DELETE CASCADE,
  brand_id uuid REFERENCES brands(id) ON DELETE CASCADE,
  name text,
  amount decimal(10,2) DEFAULT 0,
  shoot_date date,
  notes text,
  approved boolean DEFAULT false,
  post_link text,
  paid_amount decimal(10,2) DEFAULT 0,
  paid_date date,
  status text DEFAULT 'draft',
  type text DEFAULT 'collab',
  payment_status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL,
  title text NOT NULL,
  message text,
  read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE influencers ENABLE ROW LEVEL SECURITY;
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Create policies (allowing all operations for now - adjust based on your auth requirements)
CREATE POLICY "Allow all operations on influencers" ON influencers FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow all operations on brands" ON brands FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow all operations on campaigns" ON campaigns FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow all operations on notifications" ON notifications FOR ALL TO authenticated USING (true);

-- Insert sample data
INSERT INTO influencers (name, username, email, phone, platform, followers, engagement_rate, category, location, status, profile_image) VALUES
('Sarah Johnson', 'sarahjohnson', 'sarah@example.com', '+91 98765 43210', 'Instagram', 125000, 4.2, 'Fashion', 'Mumbai, India', 'active', 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'),
('Mike Chen', 'mikechen', 'mike@example.com', '+91 98765 43211', 'YouTube', 89000, 6.8, 'Tech', 'Bangalore, India', 'active', 'https://images.pexels.com/photos/428321/pexels-photo-428321.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'),
('Emma Davis', 'emmadavis', 'emma@example.com', '+91 98765 43212', 'TikTok', 234000, 8.1, 'Lifestyle', 'Delhi, India', 'active', 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'),
('Alex Rodriguez', 'alexrodriguez', 'alex@example.com', '+91 98765 43213', 'Instagram', 167000, 5.3, 'Fitness', 'Chennai, India', 'active', 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'),
('Lisa Wang', 'lisawang', 'lisa@example.com', '+91 98765 43214', 'Instagram', 98000, 7.2, 'Beauty', 'Pune, India', 'active', 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop');

INSERT INTO brands (name, owner_name, email, phone, industry, logo) VALUES
('Nike', 'John Anderson', 'john@nike.com', '+91 11 2345 6789', 'Sports', 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'),
('Adidas', 'Maria Garcia', 'maria@adidas.com', '+91 11 2345 6790', 'Sports', 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'),
('Samsung', 'David Kim', 'david@samsung.com', '+91 11 2345 6791', 'Technology', 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'),
('Apple', 'Sarah Johnson', 'sarah@apple.com', '+91 11 2345 6792', 'Technology', 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'),
('Puma', 'Michael Brown', 'michael@puma.com', '+91 11 2345 6793', 'Sports', 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop');

-- Insert sample campaigns
INSERT INTO campaigns (influencer_id, brand_id, name, amount, shoot_date, notes, approved, post_link, paid_amount, paid_date, status, type, payment_status) VALUES
((SELECT id FROM influencers WHERE username = 'sarahjohnson'), (SELECT id FROM brands WHERE name = 'Nike'), 'Summer Collection 2024', 25000, '2024-07-01', 'Collab Done', true, 'https://instagram.com/p/example1', 25000, '2024-07-01', 'posted', 'collab', 'paid'),
((SELECT id FROM influencers WHERE username = 'emmadavis'), (SELECT id FROM brands WHERE name = 'Puma'), 'Fitness Campaign', 18000, '2024-06-30', 'Collab Done', true, null, 0, null, 'posted', 'collab', 'pending'),
((SELECT id FROM influencers WHERE username = 'mikechen'), (SELECT id FROM brands WHERE name = 'Adidas'), 'Tech Review', 21000, '2024-06-28', 'Collab Done', true, null, 0, null, 'posted', 'collab', 'pending'),
((SELECT id FROM influencers WHERE username = 'alexrodriguez'), (SELECT id FROM brands WHERE name = 'Samsung'), 'Product Launch', 11000, '2024-07-01', 'Collab Done', true, 'https://instagram.com/p/example2', 11000, '2024-06-28', 'posted', 'collab', 'paid'),
((SELECT id FROM influencers WHERE username = 'lisawang'), (SELECT id FROM brands WHERE name = 'Apple'), 'Beauty Tech', 32000, '2024-06-28', 'Collab Done', true, 'https://instagram.com/p/example3', 32000, '2024-06-28', 'posted', 'collab', 'paid');

-- Insert sample notifications
INSERT INTO notifications (type, title, message, read) VALUES
('payment', 'New Payment Request', 'Sarah Johnson submitted payment request for Nike campaign', false),
('draft', 'Draft Submitted', 'Alex Rodriguez submitted draft for Samsung campaign', false),
('overdue', 'Campaign Overdue', 'Emma Davis campaign for Puma is 3 days overdue', false),
('payment', 'Payment Request Approved', 'Mike Chen''s payment for Adidas campaign has been approved', true),
('campaign', 'New Campaign Created', 'Lisa Wang assigned to new Apple campaign', true);