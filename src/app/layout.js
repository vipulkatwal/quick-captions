import "./globals.css";
import SparklesIcon from "@/components/SparklesIcon";
import { Inter } from "next/font/google";
import Link from "next/link";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Quick Captions",
};

// Define the root layout for the application
export default function RootLayout({ children }) {
	return (
		<html lang="en">
			{" "}
			<Head>
				<link rel="icon" href="/public/favicon.ico" />{" "}
			</Head>
			<body
				className={
					inter.className + // Apply the Inter font class
					" bg-gradient-to-b from-bg-gradient-from to-bg-gradient-to min-h-screen text-white" // Add background gradient and other styles
				}
			>
				<main className="p-4 max-w-2xl mx-auto">
					{/* Sticky header with backdrop blur */}
					<header className="sticky top-0 z-10 backdrop-blur-md bg-opacity-70">
						<nav className="flex flex-col sm:flex-row justify-between items-center py-4 px-6">
							{/* Logo and title link */}
							<Link
								href="/"
								className="flex items-center gap-2 text-lg sm:text-xl font-medium hover:text-gray-200 transition-colors duration-300"
							>
								<SparklesIcon /> {/* Custom icon component */}
								<span>Quick Captions</span>
							</Link>
							{/* Navigation links */}
							<div className="flex flex-col sm:flex-row gap-4 sm:gap-6 text-sm sm:text-base font-medium mt-4 sm:mt-0">
								<Link
									href="/"
									className="hover:underline transition-colors duration-300"
								>
									Home
								</Link>
								<Link
									href="/pricing"
									className="hover:underline transition-colors duration-300"
								>
									Pricing
								</Link>
								<Link
									href="/contact"
									className="hover:underline transition-colors duration-300"
								>
									Contact
								</Link>
							</div>
						</nav>
					</header>
					{/* Render the main content */}
					{children}
				</main>
			</body>
		</html>
	);
}
