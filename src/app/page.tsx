"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";

interface Message {
	role: string;
	content: string;
}

const systemMessage: Message = {
	role: "system",
	content:
		"You are an online nurse named 'Nurse Marek'. Your role is to provide helpful, empathetic, and clear responses to basic health questions. Always remind users that your advice is general in nature and that you are not a substitute for professional medical advice. Encourage them to consult a healthcare professional for personalized care.",
};

const ChatBox = () => {
	const [messages, setMessages] = useState<Message[]>([]);
	const [userInput, setUserInput] = useState<string>("");
	const messagesEndRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUserInput(e.target.value);
	};

	const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			e.preventDefault();
			handleSubmit();
		}
	};

	const handleSubmit = async () => {
		if (userInput.trim() === "") return;

		const newUserMessage: Message = { role: "user", content: userInput };
		const updatedMessages = [...messages, newUserMessage];
		setMessages(updatedMessages);
		setUserInput("");

		try {
			const res = await axios.post("/chat", {
				messages: [systemMessage, ...updatedMessages],
			});
			const assistantReply: string = res.data.choices[0].message.content;

			setMessages([
				...updatedMessages,
				{ role: "assistant", content: assistantReply },
			]);
		} catch (error) {
			console.error("Error:", error);
		}
	};

	const newChat = () => {
		setMessages([]);
		setUserInput("");
	};

	return (
		<div className='p-6'>
			{/* Chat Header */}
			<div className='flex justify-between items-center mb-4'>
				<h2 className='text-xl font-semibold text-gray-700'>
					Chat Conversation
				</h2>
				<button
					onClick={newChat}
					className='text-sm text-red-500 hover:text-red-600'>
					New Chat
				</button>
			</div>

			{/* Chat History */}
			<div className='border border-gray-300 rounded-lg p-4 max-h-64 overflow-y-auto mb-4 bg-gray-50'>
				{messages.map((msg, index) => (
					<div key={index} className='mb-3'>
						<span className='font-bold text-gray-800'>
							{msg.role === "assistant" ? "Nurse Marek" : "You"}:
						</span>{" "}
						<span className='text-gray-600'>{msg.content}</span>
					</div>
				))}
				<div ref={messagesEndRef} />
			</div>

			{/* Input Area */}
			<div className='flex'>
				<input
					type='text'
					placeholder='Type your question here...'
					value={userInput}
					onChange={onChange}
					onKeyDown={onKeyDown}
					className='flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
				/>
				<button
					onClick={handleSubmit}
					className='bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 focus:outline-none'>
					Get Advice!
				</button>
			</div>
		</div>
	);
};

const Layout = () => {
	return (
		<div className='min-h-screen bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center p-4'>
			<div className='w-full max-w-2xl bg-white rounded-lg shadow-xl overflow-hidden'>
				{/* Header Section with Explanation */}
				<div className='p-6 border-b border-gray-200 bg-white'>
					<h1 className='text-3xl font-bold text-gray-800'>
						Online Nurse Chat
					</h1>
					<p className='mt-2 text-gray-600 text-sm'>
						Welcome to MarCare online chat. How can I help you today?
					</p>
				</div>
				{/* Chat Box Component */}
				<ChatBox />
			</div>
		</div>
	);
};

export default Layout;

// "use client";
// import { useState, useEffect, useRef } from "react";
// import axios from "axios";

// interface Message {
// 	role: string;
// 	content: string;
// }

// const systemMessage: Message = {
// 	role: "system",
// 	content:
// 		"You are an online nurse named 'Nurse Marek'. Your role is to provide helpful, empathetic, and clear responses to basic health questions. Always remind users that your advice is general in nature and that you are not a substitute for professional medical advice. Encourage them to consult a healthcare professional for personalized care.",
// };

// const App = () => {
// 	const [messages, setMessages] = useState<Message[]>([]);
// 	const [userInput, setUserInput] = useState<string>("");

// 	const messagesEndRef = useRef<HTMLDivElement>(null);

// 	useEffect(() => {
// 		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
// 	}, [messages]);

// 	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// 		setUserInput(e.target.value);
// 	};

// 	const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
// 		if (e.key === "Enter") {
// 			e.preventDefault();
// 			handleSubmit();
// 		}
// 	};

// 	const handleSubmit = async () => {
// 		if (userInput.trim() === "") return;

// 		const newUserMessage: Message = { role: "user", content: userInput };

// 		const updatedMessages = [...messages, newUserMessage];
// 		setMessages(updatedMessages);
// 		setUserInput("");

// 		try {
// 			const res = await axios.post("/chat", {
// 				messages: [systemMessage, ...updatedMessages],
// 			});
// 			const assistantReply: string = res.data.choices[0].message.content;

// 			setMessages([
// 				...updatedMessages,
// 				{ role: "assistant", content: assistantReply },
// 			]);
// 		} catch (error) {
// 			console.error("Error:", error);
// 		}
// 	};

// 	const newChat = () => {
// 		setMessages([]);
// 		setUserInput("");
// 	};

// 	return (
// 		<div className='min-h-screen bg-gray-100 flex items-center justify-center p-4'>
// 			<div className='w-full max-w-md bg-white shadow-lg rounded p-6'>
// 				<div className='flex justify-between items-center mb-4'>
// 					<h1 className='text-2xl font-bold'>Online Nurse Chat</h1>
// 					<button
// 						onClick={newChat}
// 						className='bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 focus:outline-none text-sm'>
// 						New Chat
// 					</button>
// 				</div>

// 				<div className='border border-gray-200 p-2 rounded h-64 overflow-y-auto mb-4'>
// 					{messages.map((msg, index) => (
// 						<div key={index} className='text-sm mb-2'>
// 							<span className='font-bold'>
// 								{msg.role === "assistant" ? "Nurse" : "You"}:
// 							</span>{" "}
// 							{msg.content}
// 						</div>
// 					))}

// 					<div ref={messagesEndRef} />
// 				</div>

// 				<div className='mb-4'>
// 					<input
// 						type='text'
// 						placeholder='Type your question here...'
// 						value={userInput}
// 						onChange={onChange}
// 						onKeyDown={onKeyDown}
// 						className='w-full px-4 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300'
// 					/>
// 				</div>

// 				<div>
// 					<button
// 						onClick={handleSubmit}
// 						className='w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none text-sm'>
// 						Get Advice!
// 					</button>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default App;

// "use client";
// import { useState } from "react";
// import axios from "axios";
// import "./globals.css";

// const App = () => {
// 	const [response, setResponse] = useState<string>(
// 		"Hi! How can I help you today?"
// 	);

// 	const [value, setValue] = useState<string>("");

// 	const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
// 		setValue(e.target.value);

// 	const handleSubmit = async () => {
// 		const response = (await axios.post("/chat", { question: value })).data
// 			.choices[0].message.content;
// 		setResponse(response);
// 	};
// 	return (
// 		<div className='container'>
// 			<div>
// 				<input type='text' value={value} onChange={onChange}></input>
// 			</div>
// 			<div>
// 				<button onClick={handleSubmit}>Get advice!</button>
// 			</div>
// 			<div>
// 				<p>Your nurse: {response}</p>
// 			</div>
// 		</div>
// 	);
// };

// export default App;
