// generateAiResponse.js (CommonJS style)

const { GoogleGenAI } = require("@google/genai");
const dotenv = require("dotenv");

dotenv.config();
const ai = new GoogleGenAI({apiKey: process.env.GOOGLE_API_KEY});

const generateAiResponse = async (problem, code) => {
  const prompt = `
You're a coding assistant. Given a DSA problem and a student's solution, respond in 3–4 bullet points:

Problem:
${JSON.stringify(problem, null, 2)}

Code:
${code}

- Does it work for the given problem? (Yes/No + 1 line reason)
  If no, give hints to solve it. Do not give time/space complexity if incorrect.
- Time & Space complexity (short)
- 1 improvement (if any)
- 1 learning tip

Be brief (under 100 words total). Use clear, simple language.
If you think it require more words to explain so keep the range btw 100 to 500.
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return response.text;
};


// Export for use in other files
module.exports = generateAiResponse;
