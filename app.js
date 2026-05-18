const supabaseUrl = "https://dpjmlasbomyleogiimmy.supabase.co";
const supabaseKey = "sb_publishable_wAAf0ea-YM8y2Rwl-tb8qQ_Ch51opEi";
const supabaseClient = supabase.createClient(
SUPABASE_URL,
SUPABASE_KEY
);

const toolsContainer =
document.getElementById("toolsContainer");

const searchInput =
document.getElementById("searchInput");

const filterButtons =
document.querySelectorAll(".filter-btn");

let allTools = [];

async function loadTools(){

const { data, error } = await supabaseClient
.from("tools")
.select("*");

if(error){
console.log(error);
return;
}

allTools = data;

renderTools(allTools);

}

function renderTools(tools){

toolsContainer.innerHTML = tools.map(tool => `

<div class="tool-card">

<div class="tool-category">
${tool.category}
</div>

<h3>${tool.name}</h3>

<p>
${tool.description}
</p>

<a href="${tool.url}" target="_blank">
Visit Tool →
</a>

</div>

`).join("");

}

searchInput.addEventListener("input",(e)=>{

const value = e.target.value.toLowerCase();

const filtered = allTools.filter(tool =>

tool.name.toLowerCase().includes(value)

);

renderTools(filtered);

});

filterButtons.forEach(button=>{

button.addEventListener("click",()=>{

const category =
button.dataset.category;

if(category === "All"){
renderTools(allTools);
return;
}

const filtered = allTools.filter(tool =>

tool.category === category

);

renderTools(filtered);

});

});

loadTools();
