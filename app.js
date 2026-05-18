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

