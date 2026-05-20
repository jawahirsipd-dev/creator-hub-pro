const button =
document.getElementById("generateBtn");

const promptInput =
document.getElementById("promptInput");

const output =
document.getElementById("output");

button.addEventListener("click", async ()=>{

const prompt =
promptInput.value;

if(!prompt){

alert("Enter a prompt");

return;

}

output.innerHTML =
"Generating AI workflow...";

const response =
await fetch(

"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=YOUR_GEMINI_API_KEY",

{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

contents:[{

parts:[{

text:

`You are an AI automation architect.

Generate a detailed AI workflow system for:

${prompt}

Include:
- workflow steps
- tools needed
- automation ideas
- AI agents required
- monetization ideas`

}]

}]

})

}

);

const data =
await response.json();

const text =
data.candidates[0]
.content.parts[0].text;

output.innerHTML =
text.replace(/\n/g,"<br>");

await supabase
.from("agents")
.insert([{

prompt:prompt,

response:text

}]);

});
