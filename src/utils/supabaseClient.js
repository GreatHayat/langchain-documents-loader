const { SupabaseClient } = require("@supabase/supabase-js");

const supabaseClient = new SupabaseClient(
  process.env.SUPABASE_PROJECT_URL,
  process.env.SUPABASE_ANON_KEY
);

module.exports = supabaseClient;
