import { supabase } from "./supabase.js";

const toolList = document.getElementById("toolList");

// LOAD TOOLS
async function loadTools() {
  const { data } = await supabase.from("tools").select("*");
  render(data);
}

// RENDER LIST
function render(tools) {
  toolList.innerHTML = tools.map(t => `
    <div class="card">
      <h3>${t.name}</h3>
      <p>${t.category}</p>
      <a href="${t.url}" target="_blank">Open</a>
      <button onclick="deleteTool('${t.id}')">Delete</button>
    </div>
  `).join("");
}

// ADD TOOL
window.addTool = async function () {
  const name = document.getElementById("name").value;
  const category = document.getElementById("category").value;
  const url = document.getElementById("url").value;
  const description = document.getElementById("desc").value;

  await supabase.from("tools").insert([
    { name, category, url, description }
  ]);

  alert("Tool Added!");
  loadTools();
}

// DELETE TOOL
window.deleteTool = async function(id) {
  await supabase.from("tools").delete().eq("id", id);
  loadTools();
}

loadTools();
