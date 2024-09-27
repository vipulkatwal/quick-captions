import { FaCheckCircle } from "react-icons/fa";
import PageHeaders from "@/components/PageHeaders";
import Image from "next/image";
import cat_in_box from "/src/assets/cat-in-box.gif";

export default function PricingPage() {
	return (
		<div className="bg-gradient-to-br from-cyan-500/60 to-purple-600/90 min-h-screen flex flex-col items-center justify-center space-y-4 text-white p-4 sm:p-6 md:p-8 rounded-2xl">
			<div className="relative mb-4 sm:mb-6">
				<Image
					src={cat_in_box}
					alt="Cat in a Box"
					className="rounded-3xl"
					width={64}
					height={64}
				/>
			</div>

			{/* Page headers with pricing title and description */}
			<PageHeaders
				h1Text={"Explore Our Simple Pricing"}
				h2Text={"We keep it simple so you can focus on what matters."}
				className="mt-8 mb-6"
			/>

			{/* Pricing card */}
			<div className="bg-white text-slate-800 rounded-lg max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto p-4 sm:p-6 md:p-8 shadow-lg text-center transform hover:scale-105 transition-transform duration-500 ease-in-out">
				<div className="flex flex-col items-center space-y-2">
					{/* Check circle icon */}
					<FaCheckCircle className="text-purple-600 text-3xl sm:text-4xl mb-3" />

					{/* Pricing plan title */}
					<h3 className="font-extrabold text-2xl sm:text-3xl mb-2 text-purple-700">
						Free Forever
					</h3>

					{/* Description of the pricing plan */}
					<p className="text-sm sm:text-base mb-3">
						No hidden fees, no catch—just pure value.
					</p>
				</div>

				{/* Button to get started */}
				<button className="bg-purple-600 hover:bg-purple-700 text-white rounded-full py-2 px-4 mt-4 font-semibold tracking-wide transition-colors">
					Get Started
				</button>
			</div>

			{/* Disclaimer about the pricing */}
			<p className="text-xs sm:text-sm opacity-80 italic mt-4">
				*You’ll never pay a cent—because simplicity should be free.
			</p>
		</div>
	);
}
