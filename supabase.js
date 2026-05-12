
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabase = createClient(
"https://dpjmlasbomyleogiimmy.supabase.co",
"YOUR_PUBLISHABLE_KEY"
);

export default supabase;
