import { GoogleGenAI } from "@google/genai";

async function generateAnswer(question, context) {

    const ai = new GoogleGenAI({

    apiKey: process.env.GEMINI_API_KEY

});


    const prompt = `
You are a knowledgeable AI assistant answering questions about documents uploaded by the user.

Your job is to understand the retrieved information, reason over it, and produce a clear, well-written answer.

Instructions:
- Treat the retrieved passages as factual.
- Do not copy sentences unless quoting is necessary.
- Rewrite the information in your own words.
- Merge related information from different passages into one coherent explanation.
- If the user asks "why", "how", or "compare", provide an explanatory answer instead of listing facts.
- If the retrieved context is incomplete, say so instead of making up information.
- Never invent facts that are not supported by the retrieved information.

Retrieved Information:
${context}

User Question:
${question}

Write a helpful answer:
`;

    const response = await ai.models.generateContent({

        model: "gemini-2.5-flash",

        contents: prompt

    });

    return response.text;

}

export default generateAnswer;