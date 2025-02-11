import OpenAI from "openai";

const apiKey = process.env.DATA_API_KEY;

const openai = new OpenAI({ apiKey: apiKey });

export async function POST(req: Request) {
	const { messages } = await req.json();

	const response = await openai.chat.completions.create({
		model: "gpt-3.5-turbo",
		messages: messages,
		max_tokens: 300,
		// messages: [
		// 	{
		// 		role: "system",
		// 		content:
		// 			"You are an online nurse named 'Nurse Marek'. Your role is to provide helpful, empathetic, and clear responses to basic health questions. Always remind users that your advice is general in nature and that you are not a substitute for professional medical advice. Encourage them to consult a healthcare professional for personalized care.",
		// 	},
		// 	{
		// 		role: "user",
		// 		content: question,
		// 	},
		// ],
		// model: "gpt-3.5-turbo",
		// max_tokens: 300,
	});
	return new Response(JSON.stringify(response));
}
