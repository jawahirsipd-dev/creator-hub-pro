const SUPABASE_URL = "https://dpjmlasbomyleogiimmy.supabase.co";
const SUPABASE_KEY = "sb_publishable_wAAf0ea-YM8y2Rwl-tb8qQ_Ch51opEi";

const client = supabase.createClient(
SUPABASE_URL,
SUPABASE_KEY
);

const toolsContainer =
document.getElementById("toolsContainer");

const searchInput =
document.getElementById("searchInput");

const buttons =
document.querySelectorAll(".filter-btn");

let allTools = [];

async function loadTools(){

toolsContainer.innerHTML =
"<h2 style='color:white'>Loading...</h2>";

const { data, error } =
await client
.from("tools")
.select("*");

if(error){

console.log(error);

toolsContainer.innerHTML =
"<h2 style='color:red'>Supabase Connection Failed</h2>";

return;

}

if(!data || data.length === 0){

toolsContainer.innerHTML =
"<h2 style='color:white'>No Tools Found</h2>";

return;

}

allTools = data;

renderTools(allTools);

}

function renderTools(tools){

toolsContainer.innerHTML =
tools.map(tool => `

<div class="tool-card">

<div class="tool-category">
${tool.category}
</div>

<h3>${tool.name}</h3>

<p>${tool.description}</p>

<a href="${tool.url}" target="_blank">
Visit Tool
</a>

</div>

`).join("");

}

searchInput.addEventListener("input",(e)=>{

const value =
e.target.value.toLowerCase();

const filtered =
allTools.filter(tool =>

tool.name.toLowerCase().includes(value)

);

renderTools(filtered);

});

buttons.forEach(button=>{

button.addEventListener("click",()=>{

const category =
button.dataset.category;

if(category === "All"){

renderTools(allTools);
return;

}

const filtered =
allTools.filter(tool =>

tool.category === category

);

renderTools(filtered);

});

});

loadTools();
