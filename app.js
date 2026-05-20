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
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyAd4sPxJ2lMtrkCjmJ41QUl0KeFD2JU4ZE",
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

    console.log(data);

    // HANDLE API ERRORS
    if (data.error) {

      output.innerHTML =
        "Gemini API Error: " + data.error.message;

      return;
    }

    // SAFE RESPONSE EXTRACTION
    const text =
      data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {

      output.innerHTML =
        "No AI response received.";

      return;
    }

    output.innerHTML =
      text.replace(/\n/g, "<br>");

  } catch (error) {

    console.log(error);

    output.innerHTML =
      "Something went wrong.";

  }

});
