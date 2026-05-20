const API_KEY = "YOUR_NEW_KEY";

const MODEL = "models/gemini-2.5-flash";

const button = document.getElementById("generateBtn");
const promptInput = document.getElementById("promptInput");
const output = document.getElementById("output");

button.addEventListener("click", async () => {

  const prompt = promptInput.value.trim();

  if (!prompt) {
    alert("Please enter a prompt");
    return;
  }

  output.innerHTML = "Generating AI workflow...";

  try {

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/${MODEL}:generateContent?key=${AIzaSyB8g1h2hvjqbsDPMy1lYuc1Y9J5jDM-1CQ}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `
Create a professional AI automation workflow for:

${prompt}

Include:
1. Workflow steps
2. AI tools needed
3. Monetization strategy
4. Automation ideas
5. Recommended platforms
                  `
                }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();

    if (data.error) {
      output.innerHTML = "Error: " + data.error.message;
      return;
    }

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      output.innerHTML = "No response received.";
      return;
    }

    output.innerHTML = text.replace(/\n/g, "<br>");

  } catch (err) {
    console.log(err);
    output.innerHTML = "Request failed.";
  }

});
