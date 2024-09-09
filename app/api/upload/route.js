import { NextResponse } from "next/server";
import { GoogleAIFileManager } from "@google/generative-ai/server"
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

export const POST = async (req, res) => {
    const formData = await req.formData();
    const file = formData.get("file");
    try {
        const fileManager = new GoogleAIFileManager(process.env.GOOGLE_API_KEY);

        const formData = new FormData();
        const metadata = { file: { mimeType: file.type, displayName: file.name } };
        formData.append("metadata", new Blob([JSON.stringify(metadata)], { contentType: "application/json" }));
        formData.append("file", file);
        const res2 = await fetch(
            `https://generativelanguage.googleapis.com/upload/v1beta/files?uploadType=multipart&key=${fileManager.apiKey}`,
            { method: "post", body: formData }
        );
        const uploadResponse = await res2.json();

        const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent([
            systemPrompt,
            {
                fileData: {
                    fileUri: uploadResponse.file.uri,
                    mimeType: uploadResponse.file.mimeType,
                },
            },
        ]);
        const response = await result.response.text();
        return NextResponse.json(response);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Error occurred', error: error.message }, { status: 500 });
    }
};
