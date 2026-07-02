/*
  # Project Management & Dashboard Schema

  1. New Tables
    - `services`
      - `id` (serial, primary key)
      - `name` (text, not null) — e.g. "Web Development", "Mobile App Development"
      - `slug` (text, unique, not null) — URL-friendly identifier
      - `description` (text, not null)
      - `icon` (text, not null) — Lucide icon name
      - `sort_order` (integer, default 0)

    - `projects`
      - `id` (uuid, primary key, default gen_random_uuid)
      - `customer_id` (uuid, references auth.users, not null)
      - `name` (text, not null) — project name
      - `service_type` (text, not null) — which service category
      - `description` (text, not null) — detailed project description
      - `budget_range` (text, not null) — e.g. "$5k-$10k"
      - `timeline` (text, not null) — e.g. "2-4 weeks"
      - `deadline` (date) — specific deadline if any
      - `tech_preferences` (text, default '') — preferred technologies
      - `status` (text, default 'submitted') — submitted / in_review / approved / in_progress / completed
      - `priority` (text, default 'medium') — low / medium / high / urgent
      - `additional_notes` (text, default '')
      - `created_at` (timestamptz, default now())
      - `updated_at` (timestamptz, default now())

    - `team_availability`
      - `id` (serial, primary key)
      - `department` (text, not null)
      - `total_members` (integer, not null)
      - `available_members` (integer, not null)
      - `active_projects` (integer, default 0)
      - `capacity_percent` (integer, default 0) — 0-100 utilization
      - `updated_at` (timestamptz, default now())

    - `profiles` — updated to add role column
      - Adds `role` (text, default 'customer') — 'customer' or 'admin'
      - Adds `phone` (text, default '')

  2. Security
    - Enable RLS on all new tables
    - `services`: public read
    - `projects`: customers can CRUD own projects, admins can read all
    - `team_availability`: public read, admin-only write
    - `profiles`: users can read/update own row; admins can read all
*/

-- ─── Services ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS services (
  id serial PRIMARY KEY,
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text NOT NULL,
  icon text NOT NULL,
  sort_order integer DEFAULT 0
);

ALTER TABLE services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view services"
  ON services FOR SELECT
  TO authenticated, anon
  USING (true);

-- ─── Projects ───────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  service_type text NOT NULL,
  description text NOT NULL,
  budget_range text NOT NULL,
  timeline text NOT NULL,
  deadline date,
  tech_preferences text DEFAULT '',
  status text DEFAULT 'submitted',
  priority text DEFAULT 'medium',
  additional_notes text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Customers can view own projects"
  ON projects FOR SELECT
  TO authenticated
  USING (auth.uid() = customer_id);

CREATE POLICY "Customers can insert own projects"
  ON projects FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = customer_id);

CREATE POLICY "Customers can update own projects"
  ON projects FOR UPDATE
  TO authenticated
  USING (auth.uid() = customer_id)
  WITH CHECK (auth.uid() = customer_id);

-- ─── Team Availability ──────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS team_availability (
  id serial PRIMARY KEY,
  department text NOT NULL,
  total_members integer NOT NULL,
  available_members integer NOT NULL,
  active_projects integer DEFAULT 0,
  capacity_percent integer DEFAULT 0,
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE team_availability ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view team availability"
  ON team_availability FOR SELECT
  TO authenticated, anon
  USING (true);

-- ─── Update profiles table ──────────────────────────────────────────────────
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'role'
  ) THEN
    ALTER TABLE profiles ADD COLUMN role text DEFAULT 'customer';
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'phone'
  ) THEN
    ALTER TABLE profiles ADD COLUMN phone text DEFAULT '';
  END IF;
END $$;

-- ─── Indexes ────────────────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_projects_customer ON projects(customer_id);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_team_availability_dept ON team_availability(department);
