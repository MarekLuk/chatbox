import Link from "next/link";

export default function NavBar() {
	return (
		<nav className='fixed top-0 left-0 right-0 bg-primary-500 p-4 text-white shadow-lg z-50'>
			<ul className='flex justify-center space-x-6'>
				<li>
					<Link href='/' className='hover:text-blue-200'>
						Home
					</Link>
				</li>
				<li>
					<Link href='/about' className='hover:text-blue-200'>
						About
					</Link>
				</li>
			</ul>
		</nav>
	);
}
