const supabaseUrl = "https://dpjmlasbomyleogiimmy.supabase.co";
const supabaseKey = "sb_publishable_wAAf0ea-YM8y2Rwl-tb8qQ_Ch51opEi";

const client = supabase.createClient(
supabaseUrl,
supabaseKey
);

let allTools = [];
let currentCategory = "All";

/* LOAD TOOLS */
async function loadTools(){

const { data, error } = await client
.from("tools")
.select("*")
.order("created_at", { ascending:false });

if(error){
console.log("Supabase Error:", error);
return;
}

allTools = data || [];

renderTools(allTools);

}

loadTools();

/* RENDER TOOLS */
function renderTools(tools){

const container =
document.getElementById("toolsContainer");

if(!container) return;

if(tools.length === 0){

container.innerHTML = `
<div class="no-tools">
No tools found
</div>
`;

return;

}

container.innerHTML = tools.map(tool => `

<div class="tool-card">

<div class="tool-top">

<span class="tool-category">
${tool.category || "AI"}
</span>

</div>

<h3>
${tool.name}
</h3>

<p>
${tool.description || "No description available"}
</p>

<div class="tool-bottom">

<a
href="${tool.url}"
target="_blank"
class="visit-btn"
onclick="trackClick('${tool.id}')"
>
Visit Tool
</a>

</div>

</div>

`).join("");

}

/* SEARCH */
const searchInput =
document.getElementById("searchInput");

searchInput.addEventListener("input", e => {

const search =
e.target.value.toLowerCase();

filterTools(search, currentCategory);

});

/* CATEGORY FILTER */
const filterButtons =
document.querySelectorAll(".filter-btn");

filterButtons.forEach(button => {

button.addEventListener("click", () => {

filterButtons.forEach(btn =>
btn.classList.remove("active")
);

button.classList.add("active");

currentCategory =
button.dataset.category;

const search =
searchInput.value.toLowerCase();

filterTools(search, currentCategory);

});

});

/* FILTER LOGIC */
function filterTools(search, category){

let filtered = allTools;

if(category !== "All"){

filtered = filtered.filter(tool =>
tool.category &&
tool.category.toLowerCase() ===
category.toLowerCase()
);

}

if(search){

filtered = filtered.filter(tool =>

tool.name.toLowerCase().includes(search) ||

(tool.description &&
tool.description.toLowerCase().includes(search))

);

}

renderTools(filtered);

}

/* CLICK TRACKING */
async function trackClick(id){

const tool =
allTools.find(t => t.id == id);

if(!tool) return;

const newClicks =
(tool.clicks || 0) + 1;

await client
.from("tools")
.update({
clicks:newClicks
})
.eq("id", id);

}

/* TRENDING SYSTEM */
async function loadTrending(){

const { data, error } = await client
.from("tools")
.select("*")
.order("clicks", { ascending:false })
.limit(6);

if(error) return;

console.log("Trending:", data);

}

loadTrending();
