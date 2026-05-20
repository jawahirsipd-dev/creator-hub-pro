const button =
document.getElementById("generateBtn");

const promptInput =
document.getElementById("promptInput");

const output =
document.getElementById("output");

button.addEventListener("click", async () => {

const prompt =
promptInput.value.trim();

if(!prompt){

alert("Please enter a prompt");

return;

}

output.innerHTML =
"Generating AI workflow...";

try{

const response = await fetch(

"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?AIzaSyAd4sPxJ2lMtrkCjmJ41QUl0KeFD2JU4ZE",

{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

contents:[{

parts:[{

text:

`You are an expert AI automation architect.

Create a professional AI workflow system for:

${prompt}

Include:
1. Workflow steps
2. AI tools needed
3. Automation strategy
4. Monetization ideas
5. Recommended AI agents`

}]

}]

})

}

);

const data =
await response.json();

console.log(data);

const text =
data.candidates[0]
.content.parts[0]
.text;

output.innerHTML =
text.replace(/\n/g,"<br>");

await supabase
.from("agents")
.insert([{

prompt:prompt,

response:text

}]);

}catch(error){

console.log(error);

output.innerHTML =
"Error generating workflow.";

}

});
