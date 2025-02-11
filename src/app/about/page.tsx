"use client";

import { motion } from "framer-motion";
import { MdLocalHospital } from "react-icons/md";
import Link from "next/link";

export default function AboutPage() {
	return (
		<div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-blue-600 p-8'>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				className='w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row'>
				<div className='md:w-1/2 p-10 bg-gradient-to-b from-indigo-50 to-blue-50 flex flex-col justify-center items-center'>
					<div className='flex items-center justify-center mb-8'>
						<MdLocalHospital className='w-16 h-16 text-primary-500 animate-pulse' />
					</div>
					<h1 className='text-4xl font-bold text-gray-800 mb-2 text-center'>
						About MarCare
					</h1>
					<p className='text-center text-gray-600 text-lg'>
						Your trusted partner in online health guidance.
					</p>
				</div>

				<div className='md:w-1/2 p-8 border-t md:border-t-0 md:border-l border-gray-200 flex flex-col justify-center'>
					<h2 className='text-2xl font-bold text-gray-800 mb-4'>Our Mission</h2>
					<p className='text-lg text-gray-600 mb-6'>
						At MarCare, our mission is to empower you with reliable, empathetic,
						and accessible health advice. We strive to create a supportive and
						informative environment that helps you make well-informed decisions
						about your health and well-being.
					</p>
					<h2 className='text-2xl font-bold text-gray-800 mb-4'>
						Our Commitment
					</h2>
					<p className='text-lg text-gray-600'>
						We are dedicated to delivering personalized care through our online
						platform. Our team of experts works tirelessly to provide clear
						guidance and accurate information, ensuring you receive the best
						possible support every step of the way.
					</p>

					<div className='mt-8 text-center'>
						<Link
							href='/'
							className='inline-block px-6 py-3 bg-primary-500 text-white font-medium rounded-full hover:bg-primary-600 transition duration-300'>
							Back to Chat
						</Link>
					</div>
				</div>
			</motion.div>
		</div>
	);
}
