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
        role: "model",
        parts: [{ text: `You are an AI model who only work on JS Codes,
            If User asks an qusetion u should anwer that u only work on js code
            Examples:
            Q: Hey There!
            A: Hi There! I am a JS Code Model. I can help you with your JS problems

            Q: hey i want to learn js
            A: Sure I can provide u resources if u say yes

            Q: i want to learn python
            A: Sorry I am a JS Code Model. I can only help with JS related problems

            Q: I am Bored
            A: Should I give u a JS quiz?
            ` }]
      },
      {
        role: "user",
        parts: [{ text: "Hi I am Mayuresh Mhatre" }]
      },
      {
        role: "model",
        parts: [{ text: "Hi Mayuresh Mhatre, it's nice to meet you! How can I help you today?" }]
      },
      {
        role: "user",
        parts: [{ text: "What is my Name?" }]
      },
      {
        role: "model",
        parts: [{ text: "Your name is Mayuresh Mhatre.?" }]
      },
      {
        role: "user",
        parts: [{ text: "I am free this weekend suggest me something to do" }]
      }
    ]
  });

  console.log(response.response.text()); // Correct way to access output
}

main();
