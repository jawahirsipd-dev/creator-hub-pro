// ================= LOGO =================
function getLogo(url) {
  try {
    let domain = new URL(url).hostname.replace("www.", "");
    return `https://img.logo.dev/${domain}?token=demo`;
  } catch {
    return "https://via.placeholder.com/45";
  }
}

// ================= SUPABASE =================
const SUPABASE_URL = "https://dpjmlasbomyleogiimmy.supabase.co";
const SUPABASE_KEY = "sb_publishable_wAAf0ea-YM8y2Rwl-tb8qQ_Ch51opEi";

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

let allTools = [];

// ================= LOAD DATA =================
async function loadTools() {

  const { data } = await supabaseClient
    .from("tools")
    .select("*");

  allTools = data;
  renderTools(allTools);
}

// ================= RENDER =================
function renderTools(data) {

  const container = document.getElementById("tools");
  container.innerHTML = "";

  data.forEach(tool => {

    const logo = getLogo(tool.url);

    container.innerHTML += `
      <div class="card" data-category="${tool.category}">

        <img src="${logo}" class="logo">

        <div>
          <h3>${tool.name}</h3>
          <p>${tool.description}</p>
          <a href="${tool.url}" target="_blank">Open</a>
        </div>

      </div>
    `;
  });
}

// ================= SEARCH =================
document.getElementById("search").addEventListener("input", function(e){
  const value = e.target.value.toLowerCase();

  const filtered = allTools.filter(tool =>
    tool.name.toLowerCase().includes(value) ||
    tool.description.toLowerCase().includes(value)
  );

  renderTools(filtered);
});

// ================= CATEGORY FILTER =================
function filterCategory(category){

  if(category === "All"){
    renderTools(allTools);
    return;
  }

  const filtered = allTools.filter(tool =>
    tool.category === category
  );

  renderTools(filtered);
}

// RUN
loadTools();
