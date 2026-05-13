const supabase = window.supabase.createClient(
"https://dpjmlasbomyleogiimmy.supabase.co/rest/v1/",
"sb_publishable_wAAf0ea-YM8y2Rwl-tb8qQ_Ch51opEi"
);

const toolsContainer =
document.getElementById("toolsContainer");

const searchInput =
document.getElementById("searchInput");

const filterButtons =
document.querySelectorAll(".filter-btn");

let allTools = [];

let allTools = [];

async function loadTools() {

const { data, error } = await supabase
.from("tools")
.select("*");

if (error) {
console.log("Supabase Error:", error);
return;
}

console.log("Loaded Tools:", data);

allTools = data || [];

renderTools(allTools);
}

loadTools();

/* RENDER */
function renderTools(tools){

toolsContainer.innerHTML = tools.map(tool => `

<div class="tool-card">

${tool.featured ? `
<div class="featured-badge">
⭐ Featured
</div>
` : ""}

${tool.premium ? `
<div class="premium-badge">
🔒 Premium
</div>
` : ""}

<h3>
${tool.name}
</h3>

<p>
${tool.description}
</p>

<div class="tool-meta">

<span>
${tool.category}
</span>

<span>
🔥 ${tool.clicks || 0}
</span>

</div>

<a
href="tool.html?id=${tool.id}"
class="visit-btn"
onclick="trackClick('${tool.id}')"
>
View Tool
</a>

</div>

`).join("");

}

/* SEARCH */
searchInput.addEventListener("input", filterTools);

/* FILTER BUTTONS */
filterButtons.forEach(button => {

button.addEventListener("click", () => {

filterButtons.forEach(btn =>
btn.classList.remove("active")
);

button.classList.add("active");

activeCategory =
button.dataset.category;

filterTools();

});

});

/* FILTER FUNCTION */
function filterTools(){

const search =
searchInput.value.toLowerCase();

const filtered = allTools.filter(tool => {

const matchesSearch =
tool.name.toLowerCase().includes(search) ||
tool.description.toLowerCase().includes(search);

const matchesCategory =
activeCategory === "All" ||
tool.category === activeCategory;

return matchesSearch && matchesCategory;

});

renderTools(filtered);

}

/* TRACK CLICKS */
window.trackClick = async function(id){

const tool =
allTools.find(t => t.id === id);

if(!tool) return;

const newClicks =
(tool.clicks || 0) + 1;

await supabase
.from("tools")
.update({
clicks:newClicks,
trending_score:newClicks
})
.eq("id",id);

}

/* START */
loadTools();
