"use client";
import ResultVideo from "@/components/ResultVideo";
import TranscriptionEditor from "@/components/TranscriptionEditor";
import { clearTranscriptionItems } from "@/libs/awsTranscriptionHelpers";
import axios from "axios";
import { useEffect, useState } from "react";

// Component to handle file transcription and display results
export default function FilePage({ params }) {
	const filename = params.filename; // Extract filename from params
	const [isTranscribing, setIsTranscribing] = useState(false); // State to track transcription status
	const [isFetchingInfo, setIsFetchingInfo] = useState(false); // State to track if info is being fetched
	const [awsTranscriptionItems, setAwsTranscriptionItems] = useState([]); // State to hold transcription items

	// useEffect to fetch transcription data whenever the filename changes
	useEffect(() => {
		getTranscription(); // Call function to get transcription data
	}, [filename]); // Dependency array ensures effect runs when filename changes

	// Function to get transcription status and items from the server
	function getTranscription() {
		setIsFetchingInfo(true); // Set fetching status to true
		axios
			.get("/api/transcribe?filename=" + filename) // Send GET request to fetch transcription data
			.then((response) => {
				setIsFetchingInfo(false); // Set fetching status to false
				const status = response.data?.status; // Extract status from response
				const transcription = response.data?.transcription; // Extract transcription from response

				if (status === "IN_PROGRESS") {
					// If transcription is still in progress
					setIsTranscribing(true); // Set transcribing status to true
					setTimeout(getTranscription, 3000); // Retry fetching transcription every 3 seconds
				} else {
					setIsTranscribing(false); // Set transcribing status to false

					// Check if transcription results and items exist
					if (transcription?.results?.items) {
						setAwsTranscriptionItems(
							clearTranscriptionItems(transcription.results.items) // Process and set transcription items
						);
					} else {
						console.warn(
							"Transcription results or items are missing in the response" // Log a warning if transcription items are missing
						);
					}
				}
			})
			.catch((error) => {
				setIsFetchingInfo(false); // Set fetching status to false on error
				console.error("Error fetching transcription:", error); // Log error
			});
	}

	// Render loading or content based on the current state
	if (isTranscribing) {
		return <div>Transcribing your video...</div>; // Show a message while transcribing
	}

	if (isFetchingInfo) {
		return <div>Fetching information...</div>; // Show a message while fetching info
	}

	return (
		<div>
			<div className="grid sm:grid-cols-2 gap-8 sm:gap-16">
				<div>
					<h2 className="text-2xl mb-4 text-white/60">Transcription</h2>
					<TranscriptionEditor
						awsTranscriptionItems={awsTranscriptionItems}
						setAwsTranscriptionItems={setAwsTranscriptionItems}
					/>
				</div>
				<div>
					<h2 className="text-2xl mb-4 text-white/60">Result</h2>
					<ResultVideo
						filename={filename}
						transcriptionItems={awsTranscriptionItems}
					/>
				</div>
			</div>
		</div>
	);
}
