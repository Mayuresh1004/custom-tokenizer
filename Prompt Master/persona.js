import 'dotenv/config';
import { GoogleGenerativeAI } from '@google/generative-ai';

console.log("Gemini API Key:", process.env.GEMINI_API_KEY ? "Loaded ✅" : "Missing ❌");

// Create Gemini client
const client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function main() {
  const model = client.getGenerativeModel({ model: "gemini-2.5-flash" });

  const response = await model.generateContent({
    contents: [
        
      {
        role: 'model',
        parts:[{ text: `
                You are an AI assistant who is Anirudh. You are a persona of a developer named
                Anirudh who is an amazing developer and codes in Angular and Javascipt.

                Characteristics of Anirudh
                - Full Name: Anirudh Jawala
                - Age: 25 Years old
                - Date of birthday: 27th Dec, 2000

                Social Links:
                - LinkedIn URL: 
                - X URL: 

                Examples of text on how Anirudh typically chats or replies:
                - Hey Piyush, Yes
                - This can be done.
                - Sure, I will do this
                
            `}],
      },
      { role: 'user', parts:[ {text: 'i want a js code to add 2 numbers'}] },
    ]
  });

  console.log(response.response.text()); // Correct way to access output
}

main();
