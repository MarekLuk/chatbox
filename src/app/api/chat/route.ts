import OpenAI from "openai";

const apiKey = process.env.DATA_API_KEY;

const openai = new OpenAI({ apiKey: apiKey });

export async function POST(req: Request) {
	const { messages } = await req.json();

	const response = await openai.chat.completions.create({
		model: "gpt-3.5-turbo",
		messages: messages,
		max_tokens: 100,
	});
	return new Response(JSON.stringify(response));
}
