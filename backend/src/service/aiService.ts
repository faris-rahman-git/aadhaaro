import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const openrouter = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: process.env.OPENROUTER_BASE_URL || "https://openrouter.ai/api/v1",
});

export const verifyAndFormatText = async (
  frontText: string,
  backText: string
) => {
  const combinedText = `Front Text:\n${frontText}\n\nBack Text:\n${backText}`;

  const prompt = `
You are an expert at reading Indian identity cards.
Given the OCR text below, check if it looks like an Aadhaar card.
If yes, extract the following fields:

{details : {- name
- aadhaarNumber
- dob (DD/MM/YYYY)
- gender
- address
- pincode}
- isAadhaarValid (true/false)
- reason (why invalid if false)}

Return JSON only. Make sure the JSON is valid.

Text:
${combinedText}
  `;

  try {
    const completion = await openrouter.chat.completions.create({
      model: "openai/gpt-4.1",
      messages: [
        {
          role: "user",
          content: [{ type: "text", text: prompt }],
        },
      ],
      temperature: 0,
      max_tokens: 800,
    });
    const rawChoice = completion.choices?.[0]?.message;
    let aiOutput = "";

    if (!rawChoice) {
      throw new Error("No choice returned by model");
    }
    const c = rawChoice.content;
    if (Array.isArray(c) && c.length > 0 && typeof c[0].text === "string") {
      aiOutput = c[0].text;
    } else if (Array.isArray(c) && c.length > 0 && typeof c[0] === "string") {
      aiOutput = c[0];
    } else if (typeof c === "string") {
      aiOutput = c;
    } else {
      aiOutput = JSON.stringify(rawChoice);
    }

    let parsed = null;
    try {
      parsed = JSON.parse(aiOutput.trim());
    } catch (parseErr) {
      const jsonMatch = aiOutput.match(/\{[\s\S]*\}/m);
      if (jsonMatch) {
        try {
          parsed = JSON.parse(jsonMatch[0]);
        } catch (innerErr) {
          console.error("Failed to parse JSON from model output:", innerErr);
        }
      }
      if (!parsed) {
        console.error("Model output (unparsable):", aiOutput);
        throw new Error("AI returned unparsable JSON");
      }
    }

    if (parsed?.aadhaarNumber) {
      parsed.aadhaarNumber = parsed.aadhaarNumber
        .replace(/\D/g, "")
        .replace(/(\d{4})(\d{4})(\d{4})/, "$1 $2 $3");
    }

    if (parsed?.dob) {
      parsed.dob = parsed.dob.replace(/[-\.]/g, "/");
    }

    return parsed;
  } catch (err) {
    console.error("OpenRouter AI error:", err);
  }
};
