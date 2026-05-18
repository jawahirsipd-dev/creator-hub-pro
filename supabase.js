function getLogo(url) {
  let domain = new URL(url).hostname.replace("www.", "");
  return `https://img.logo.dev/${domain}?token=demo`;
}const SUPABASE_URL =
"https://dpjmlasbomyleogiimmy.supabase.co";

const SUPABASE_KEY =
"sb_publishable_wAAf0ea-YM8y2Rwl-tb8qQ_Ch51opEi";

const supabaseClient =
supabase.createClient(
SUPABASE_URL,
SUPABASE_KEY
);
