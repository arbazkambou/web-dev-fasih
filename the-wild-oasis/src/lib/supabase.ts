import { Database } from "@/types/database.types";
import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://pseekejagvsvwhimvvzx.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBzZWVrZWphZ3ZzdndoaW12dnp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcyNzEzMTMsImV4cCI6MjA3Mjg0NzMxM30.crKf-ejRiiG5yt5crf57EFIuaEQpn351lheFkl3RCrw";
export const supabase = createClient<Database>(supabaseUrl, supabaseKey);
