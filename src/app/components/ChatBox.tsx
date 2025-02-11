"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
	IoChatbubbleEllipsesOutline,
	IoPersonCircleOutline,
} from "react-icons/io5";
import { MdOutlineHealthAndSafety } from "react-icons/md";
import { GrPowerReset } from "react-icons/gr";

interface Message {
	role: string;
	content: string;
}

const systemMessage: Message = {
	role: "system",
	content:
		"You are an online nurse named 'Nurse'. Your role is to provide helpful, empathetic, and clear responses to basic health questions. Always remind users that your advice is general in nature and that you are not a substitute for professional medical advice. Encourage them to consult a healthcare professional for personalized care.",
};

export default function ChatBox() {
	const [messages, setMessages] = useState<Message[]>([]);
	const [userInput, setUserInput] = useState<string>("");
	const messagesEndRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setUserInput(e.target.value);
	};

	const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === "Enter" && !e.shiftKey) {
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
			const res = await axios.post("/api/chat", {
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
		<div className='flex items-center justify-center w-full'>
			<div className='m-2 w-[400px] h-[600px] border flex flex-col rounded-t-xl'>
				<header className='w-full bg-primary-500 flex justify-between px-2 py-1 rounded-t-lg items-center'>
					<h2 className='text-sm font-semibold text-white flex items-center'>
						<MdOutlineHealthAndSafety className='mr-2 w-6 h-6' />
						Health chat
					</h2>
					<div className='flex space-x-2'>
						<button onClick={newChat} title='New Chat'>
							<GrPowerReset className='w-6 h-6 text-white' />
						</button>
					</div>
				</header>

				<div className='flex-1 overflow-y-auto p-2 select-none chatbox'>
					{messages.map((msg, index) => {
						const extraMargin =
							index > 0 && messages[index - 1].role !== msg.role ? "mt-2" : "";
						if (msg.role === "assistant") {
							return (
								<div key={index} className={`flex items-end ${extraMargin}`}>
									<div className='rounded bg-primary-500 w-8 aspect-square p-1.5'>
										<IoChatbubbleEllipsesOutline className='w-full h-full text-white' />
									</div>
									<p className='mx-2 p-2 rounded bg-blue-50 leading-4 text-sm text-gray-800'>
										{msg.content}
									</p>
								</div>
							);
						} else {
							return (
								<div
									key={index}
									className={`flex items-end flex-row-reverse ${extraMargin}`}>
									<div className='rounded bg-primary-500 w-8 aspect-square p-1.5'>
										<IoPersonCircleOutline className='w-full h-full text-white' />
									</div>
									<p className='mx-2 p-2 rounded bg-gray-200 leading-4 text-sm text-gray-800'>
										{msg.content}
									</p>
								</div>
							);
						}
					})}
					<div ref={messagesEndRef} />
				</div>

				<div className='flex items-center p-2 border-t'>
					<textarea
						id='chat'
						rows={1}
						placeholder='Tell me how can I help you...'
						value={userInput}
						onChange={onChange}
						onKeyDown={onKeyDown}
						className='flex-grow mx-2 p-2.5 text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500'
					/>
					<button
						onClick={handleSubmit}
						type='submit'
						className='flex justify-center items-center aspect-square h-9 bg-primary-500  p-2 text-white rounded-full cursor-pointer hover:bg-primary-700'>
						<IoChatbubbleEllipsesOutline className='w-6 h-6' />
					</button>
				</div>
			</div>
		</div>
	);
}
