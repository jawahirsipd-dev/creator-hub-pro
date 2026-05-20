const API_KEY = "key=${API_KEY}";  

const MODEL = "gemini-1.5-flash";

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
     `https://generativelanguage.googleapis.com/v1/models/${MODEL}:generateContent?key=${AIzaSyDZHnWF0oHXrOGEB_zFU2mc79tvapOSs5s}`,
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

    if (!response.ok) {
      throw new Error(data.error?.message || "API request failed");
    }

    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    output.innerHTML = text
      ? text.replace(/\n/g, "<br>")
      : "No response received.";

  } catch (err) {
    console.error(err);
    output.innerHTML = "Error: " + err.message;
  }
});
