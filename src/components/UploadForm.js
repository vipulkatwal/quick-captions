"use client";
import UploadIcon from "@/components/UploadIcon";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import cat_purr from "/src/assets/cat-purr.gif";
import Image from "next/image";

export default function UploadForm() {
	const [isUploading, setIsUploading] = useState(false); // State to track if a file is being uploaded
	const router = useRouter(); // Initialize the router for programmatic navigation

	// to handle file upload
	async function upload(ev) {
		ev.preventDefault(); // Prevent the default form submission
		const files = ev.target.files; // Get the selected file(s)
		if (files.length > 0) {
			const file = files[0]; // Use the first file
			setIsUploading(true); // Set uploading state to true
			// Make a POST request to the upload API with the selected file
			const res = await axios.postForm("/api/upload", {
				file,
			});
			setIsUploading(false); // Set uploading state to false after the request is complete
			const newName = res.data.newName; // Extract the new file name from the response
			router.push("/" + newName); // Redirect to the new page using the file name
		}
	}

	return (
		<>
			{/* Loading overlay shown when a file is being uploaded */}
			{isUploading && (
				<div className="bg-black/90 text-white fixed inset-0 flex items-center justify-center">
					<div className="flex flex-col items-center justify-center">
						<Image
							src={cat_purr}
							alt="Purring Cat"
							className="rounded-3xl"
							width={80}
							height={80}
						/>
						<h3 className="text-lg sm:text-xl mt-2 sm:mt-4 text-center">
							Please wait...
						</h3>
					</div>
				</div>
			)}
			{/* File input label with styling */}
			<label className="bg-green-600 py-2 px-4 sm:px-6 rounded-full inline-flex gap-2 border-2 border-purple-700/50 cursor-pointer">
				<UploadIcon /> {/* Custom upload icon */}
				<span className="text-sm sm:text-base">Choose file</span>
				{/* Hidden file input field */}
				<input onChange={upload} type="file" className="hidden" />
			</label>
		</>
	);
}
