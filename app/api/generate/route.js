import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const systemPrompt = `
You are a flashcard creator, you take in text and create multiple flashcards from it. Make sure to create exactly 10 flashcards.
Both front and back should be one sentence long.
You should return in the following JSON format:
{
  "flashcards":[
    {
      "front": "Front of the card",
      "back": "Back of the card"
    }
  ]
}
`;

export async function POST(req) {
    try {
      const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  
      const data = await req.text();
  
      // Combine system prompt with user input
      const combinedPrompt = `${systemPrompt}\nText: ${data}\n`;
  
      // Generate content using the AI model
      const result = await model.generateContent(combinedPrompt);
      const response = await result.response.text();
      const flashcards = JSON.parse(response)
  
      // console.log(flashcards);
      return NextResponse.json(flashcards["flashcards"]);
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: 'Error occurred', error: error.message }, { status: 500 });
    }
}
