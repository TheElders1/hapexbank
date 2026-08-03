/*
# Create accounts table for Hapex Banking

1. New Tables
- `accounts`: Stores all banking user accounts with their full JSON snapshot.
  - `user_id` (text, PK): Unique username/user ID for login.
  - `password` (text): Plaintext password for custom auth (this is a banking simulator).
  - `name` (text): Display name.
  - `email` (text): Email address.
  - `currency` (text): USD, EUR, or GBP.
  - `balance` (numeric): Account balance.
  - `withdrawal_fee` (numeric, default 0): Fee that gates card reveal and transfers.
  - `card_fee` (numeric, default 0): Fee for card operations.
  - `payment_status` (text, default 'none'): Payment verification status.
  - `transactions` (jsonb): Full account snapshot including transactions, cards, contacts.

2. Security
- Enable RLS on `accounts`.
- Allow anon + authenticated full CRUD — this app uses custom auth (localStorage session),
  not Supabase Auth, so the anon key client needs access. The app is a banking simulator
  where data is intentionally shared between the frontend and admin panel.

3. Notes
- Pre-seeded demo account (Holger Bellmann) is inserted on first load from the app.
- Realtime is enabled on this table for cross-device sync.
*/

CREATE TABLE IF NOT EXISTS accounts (
  user_id text PRIMARY KEY,
  password text NOT NULL,
  name text NOT NULL,
  email text,
  currency text DEFAULT 'USD',
  balance numeric DEFAULT 0,
  withdrawal_fee numeric DEFAULT 0,
  card_fee numeric DEFAULT 0,
  payment_status text DEFAULT 'none',
  transactions jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE accounts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_accounts" ON accounts;
CREATE POLICY "anon_select_accounts" ON accounts FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_accounts" ON accounts;
CREATE POLICY "anon_insert_accounts" ON accounts FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_accounts" ON accounts;
CREATE POLICY "anon_update_accounts" ON accounts FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_accounts" ON accounts;
CREATE POLICY "anon_delete_accounts" ON accounts FOR DELETE
  TO anon, authenticated USING (true);

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE accounts;
