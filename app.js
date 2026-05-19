const toolsContainer =
document.getElementById("toolsContainer");

const searchInput =
document.getElementById("searchInput");

let allTools = [];

async function loadTools(){

const { data,error } =
await supabaseClient
.from("tools")
.select("*");
.order("trending_score",{ascending:false});
if(error){

console.log(error);

return;

}

allTools = data;

renderTools(data);

}

function renderTools(tools){

toolsContainer.innerHTML = "";

tools.forEach(tool => {

toolsContainer.innerHTML += `

<div class="tool-card">

<img
src="${tool.logo_url}"
class="tool-logo"
>

<div class="tool-category">
${tool.category}
</div>

<h3>${tool.name}</h3>

<p>${tool.description}</p>

<button
class="visit-btn"
onclick="trackClick('${tool.id}','${tool.url}')"
>
Visit Tool
</button>

</div>

`;

});

}

searchInput.addEventListener("input",(e)=>{

const value =
e.target.value.toLowerCase();

const filtered =
allTools.filter(tool =>

tool.name.toLowerCase().includes(value)

||

tool.category.toLowerCase().includes(value)

);

renderTools(filtered);

});
async function trackClick(id,url){

const tool =
allTools.find(t => t.id === id);

if(!tool) return;

const newClicks =
(tool.clicks || 0) + 1;

const newTrending =
(tool.trending_score || 0) + 1;

await supabaseClient
.from("tools")
.update({

clicks:newClicks,

trending_score:newTrending

})
.eq("id",id);

window.open(url,"_blank");

}

loadTools();
