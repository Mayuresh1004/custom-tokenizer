import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { QdrantVectorStore } from "@langchain/qdrant";
import OpenAI from "openai";
import "dotenv/config";

const openai = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});

async function chat() {
    const userQuery = 'Can you tell me about debugging in Node.js with code example';

    //ready gemini embbedding model
    const embeddings = new GoogleGenerativeAIEmbeddings({
    apiKey: process.env.GEMINI_API_KEY,
    model: "text-embedding-004", // 768 dimensions
    // taskType: TaskType.RETRIEVAL_DOCUMENT,
    // title: "Document title",

});

    const vectorStore = await QdrantVectorStore.fromExistingCollection(
        embeddings,
        {
        url: "http://localhost:6333",
        collectionName: "rag_collection",
        }
    )

    //retireve vectors from the vector store
    const vectorSearcher = vectorStore.asRetriever({
        k: 3
    })
    
    
    const relevantChunks = await vectorSearcher.invoke(userQuery)

    const SYSTEM_PROMPT= `
    You are an AI Assistant who helps resolving user queries based on the context available to you feom a PDF document with the content and page number.

    Only answer based on the available context from file only.

    CONTEXT: ${JSON.stringify(relevantChunks)}
    `
    const response = await openai.chat.completions.create({
        model: "gemini-2.5-flash",
        messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: userQuery }
        ],
    });

    console.log(`>${response.choices[0].message.content}`);
    
}

chat()