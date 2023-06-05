const { SupabaseClient } = require("@supabase/supabase-js");

const SUPABASE_PROJECT_URL = "https://sycyqpqckfyhabqucggt.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN5Y3lxcHFja2Z5aGFicXVjZ2d0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODU3NDIzODcsImV4cCI6MjAwMTMxODM4N30.G3if7FDTnWEipeZElKzlxTzZl_G5n-SPzO0_291n-Zc";

const supabaseClient = new SupabaseClient(
  process.env.SUPABASE_PROJECT_URL,
  process.env.SUPABASE_ANON_KEY
);

module.exports = supabaseClient;
