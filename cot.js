import { GoogleGenAI } from '@google/genai';
import 'dotenv/config';

const client = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function main() {
  const SYSTEM_PROMPT = `
    You are an AI MODEL who works on START, THINK and OUTPUT format.
    For a given user query first think and breakdown the problem into sub problems.
    You should always keep thinking and thinking before giving the actual output.
    Also, before outputing the final result to user you must check once if everything is correct.

    Rules:
    - Strictly follow the output JSON format
    - Always follow the output in sequence that is START, THINK, EVALUATE and OUTPUT.
    - After evey think, there is going to be an EVALUATE step that is performed manually by someone and you need to wait for it.
    - Always perform only one step at a time and wait for other step.
    - Alway make sure to do multiple steps of thinking before giving out output.

    Output JSON Format:
    { "step": "START | THINK | EVALUATE | OUTPUT", "content": "string" }

    Example:
    User: Can you solve 3 + 4 * 10 - 4 * 3
    MODEL: { "step": "START", "content": "The user wants me to solve 3 + 4 * 10 - 4 * 3 maths problem" } 
    MODEL: { "step": "THINK", "content": "This is typical math problem where we use BODMAS formula for calculation" } 
    MODEL: { "step": "EVALUATE", "content": "Alright, Going good" } 
    MODEL: { "step": "THINK", "content": "Lets breakdown the problem step by step" } 
    MODEL: { "step": "EVALUATE", "content": "Alright, Going good" } 
    MODEL: { "step": "THINK", "content": "As per bodmas, first lets solve all multiplications and divisions" }
    MODEL: { "step": "EVALUATE", "content": "Alright, Going good" }  
    MODEL: { "step": "THINK", "content": "So, first we need to solve 4 * 10 that is 40" } 
    MODEL: { "step": "EVALUATE", "content": "Alright, Going good" } 
    MODEL: { "step": "THINK", "content": "Great, now the equation looks like 3 + 40 - 4 * 3" }
    MODEL: { "step": "EVALUATE", "content": "Alright, Going good" } 
    MODEL: { "step": "THINK", "content": "Now, I can see one more multiplication to be done that is 4 * 3 = 12" } 
    MODEL: { "step": "EVALUATE", "content": "Alright, Going good" } 
    MODEL: { "step": "THINK", "content": "Great, now the equation looks like 3 + 40 - 12" } 
    MODEL: { "step": "EVALUATE", "content": "Alright, Going good" } 
    MODEL: { "step": "THINK", "content": "As we have done all multiplications lets do the add and subtract" } 
    MODEL: { "step": "EVALUATE", "content": "Alright, Going good" } 
    MODEL: { "step": "THINK", "content": "so, 3 + 40 = 43" } 
    MODEL: { "step": "EVALUATE", "content": "Alright, Going good" } 
    MODEL: { "step": "THINK", "content": "new equations look like 43 - 12 which is 31" } 
    MODEL: { "step": "EVALUATE", "content": "Alright, Going good" } 
    MODEL: { "step": "THINK", "content": "great, all steps are done and final result is 31" }
    MODEL: { "step": "EVALUATE", "content": "Alright, Going good" }  
    MODEL: { "step": "OUTPUT", "content": "3 + 4 * 10 - 4 * 3 = 31" } 
  `;


    const messages = [
    {
      role: 'user',
      parts: [{ text: SYSTEM_PROMPT }],
    },
    {
      role: 'user',
      parts: [{ text: 'Write a code in JS to find a prime number as fast as possible' }],
    },
  ];

  while (true) {
    const response = await client.models.generateContent({
      model: 'gemini-2.0-flash-001',
      contents: messages,
    });

    const candidate = response?.response?.candidates?.[0];
    if (!candidate) {
      console.error("❌ No candidate response", JSON.stringify(response, null, 2));
      break;
    }

    let rawContent = candidate?.content?.parts?.[0]?.text;
    if (!rawContent) {
      console.error("❌ Candidate has no text parts:", JSON.stringify(candidate, null, 2));
      break;
    }

    // ✅ strip markdown fences if Gemini wrapped JSON in ```json ... ```
    rawContent = rawContent.replace(/```json|```/g, '').trim();

    let parsedContent;
    try {
      parsedContent = JSON.parse(rawContent);
    } catch (err) {
      console.error("❌ Failed to parse JSON, got:", rawContent);
      break;
    }

    // ✅ when pushing back to messages, use "user" (not "model")
    messages.push({
      role: 'user',
      parts: [{ text: JSON.stringify(parsedContent) }],
    });

    if (parsedContent.step === 'START') {
      console.log(`🔥`, parsedContent.content);
      continue;
    }

    if (parsedContent.step === 'OUTPUT') {
      console.log(`🤖`, parsedContent.content);
      break;
    }
  }
}

main().catch(console.error);