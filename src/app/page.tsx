"use client";

import ChatBox from "@/app/components/ChatBox";
import { MdLocalHospital } from "react-icons/md";
import { motion } from "framer-motion";

export default function ChatPage() {
	return (
		<div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-blue-600 p-8'>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				className='w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row'>
				<div className='md:w-1/2 p-10 bg-gradient-to-b from-indigo-50 to-blue-50 flex flex-col justify-center'>
					<div className='flex items-center justify-center mb-8'>
						<MdLocalHospital className='w-16 h-16 text-primary-500 animate-pulse' />
					</div>
					<h1 className='text-4xl font-bold text-gray-800 mb-4 text-center'>
						MarCare Health Chat
					</h1>
					<p className='text-lg text-gray-600 mb-6 text-center'>
						Get reliable, empathetic health advice from our online help. Ask any
						health-related question and receive prompt, personalized answers to
						help you make informed decisions about your well-being.
					</p>
					<div className='text-center'>
						<a
							href='/about'
							className='inline-block px-6 py-3 bg-primary-500 text-white font-medium rounded-full hover:bg-primary-600 transition duration-300'>
							Learn More
						</a>
					</div>
				</div>

				<div className='md:w-1/2 p-6 border-t md:border-t-0 md:border-l border-gray-200'>
					<ChatBox />
				</div>
			</motion.div>
		</div>
	);
}
