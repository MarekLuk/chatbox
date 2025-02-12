import type { Metadata } from "next";
import "./globals.css";
import NavBar from "./components/NavBar";

export const metadata: Metadata = {
	title: "MarCare",
	description: "Your trusted partner in online health guidance",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className='antialiased bg-white'>
				<NavBar />
				{children}
			</body>
		</html>
	);
}
