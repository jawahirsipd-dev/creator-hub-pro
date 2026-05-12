
import supabase from "./supabase.js";

const toolsBox = document.getElementById("tools");

let tools = [];

async function loadTools() {
  const { data } = await supabase.from("tools").select("*");

  tools = data;
  render(tools);
}

function render(list){
  toolsBox.innerHTML = list.map(t => `
    <div class="card">
      <h3>${t.name}</h3>
      <p>${t.description}</p>
      <a href="${t.url}" target="_blank">Open</a>
    </div>
  `).join("");
}

document.getElementById("search").addEventListener("input",(e)=>{
  const value = e.target.value.toLowerCase();
  const filtered = tools.filter(t =>
    t.name.toLowerCase().includes(value)
  );
  render(filtered);
});

loadTools();
