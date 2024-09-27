import {
	FaPhone,
	FaEnvelope,
	FaMapMarkerAlt,
	FaGithub,
	FaTwitter,
	FaLinkedin,
} from "react-icons/fa";
import PageHeaders from "@/components/PageHeaders";
import lazy_cat from "/src/assets/lazy-cat.gif";
import Image from "next/image";

export default function ContactPage() {
	return (
		<div className="bg-gradient-to-br from-cyan-500/60 to-purple-600/90 min-h-screen text-white flex flex-col items-center p-4 sm:p-6 md:p-8 lg:p-12 space-y-4 md:space-y-6 rounded-2xl">
			<div className="relative mb-1 sm:mb-1 flex justify-center">
				<Image
					src={lazy_cat}
					alt="Lazy Cat"
					className="rounded-3xl"
					width={80}
					height={80}
				/>
			</div>

			<PageHeaders
				h1Text={"Get in Touch"}
				h2Text={"We’re here to help and answer any question you might have."}
				className="text-center px-2 sm:px-4 mt-[-10px]"
			/>

			{/* Compact Contact Form */}
			<div className="bg-white text-slate-800 rounded-lg max-w-sm w-full mx-auto p-4 shadow-lg">
				<form className="space-y-4">
					<div>
						<label className="block font-semibold mb-1 text-sm">
							Your Name
						</label>
						<input
							type="text"
							placeholder="John Doe"
							className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
						/>
					</div>

					<div>
						<label className="block font-semibold mb-1 text-sm">
							Your Email
						</label>
						<input
							type="email"
							placeholder="johndoe@example.com"
							className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
						/>
					</div>

					<div>
						<label className="block font-semibold mb-1 text-sm">
							Your Message
						</label>
						<textarea
							placeholder="How can we help you?"
							className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition resize-none"
							rows="3"
						></textarea>
					</div>

					{/* Compact Submit Button */}
					<button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-1.5 rounded-xl transition-all">
						Send Message
					</button>
				</form>
			</div>

			{/* Social Media Links */}
			<div className="flex flex-col items-center space-y-4 text-center">
				<div className="flex space-x-4">
					<a href="#" className="text-white hover:text-purple-600 transition">
						<FaGithub size={20} />
					</a>
					<a href="#" className="text-white hover:text-purple-600 transition">
						<FaLinkedin size={20} />
					</a>
					<a href="#" className="text-white hover:text-purple-600 transition">
						<FaTwitter size={20} />
					</a>
				</div>
			</div>
		</div>
	);
}
