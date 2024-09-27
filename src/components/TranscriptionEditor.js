import TranscriptionItem from "@/components/TranscriptionItem"; // Import TranscriptionItem component

export default function TranscriptionEditor({
	awsTranscriptionItems, // List of transcription items
	setAwsTranscriptionItems, // Function to update the list of transcription items
}) {
	// to update a specific property of a transcription item
	function updateTranscriptionItem(index, prop, ev) {
		const newAwsItems = [...awsTranscriptionItems]; // Create a copy of the current transcription items array
		const newItem = { ...newAwsItems[index] }; // Create a copy of the item at the specified index
		newItem[prop] = ev.target.value; // Update the specific property with the new value
		newAwsItems[index] = newItem; // Replace the old item with the updated item
		setAwsTranscriptionItems(newAwsItems); // Update the state with the modified array
	}

	return (
		<>
			{/* Header row with labels for the grid columns */}
			<div className="grid grid-cols-3 sticky top-0 bg-violet-800/80 p-2 rounded-md">
				<div>From</div>
				<div>End</div>
				<div>Content</div>
			</div>

			{/* Conditionally render the list of transcription items if they exist */}
			{awsTranscriptionItems.length > 0 && (
				<div className="h-48 sm:h-auto overflow-y-scroll sm:overflow-auto">
					{awsTranscriptionItems.map((item, key) => (
						<div key={key}>
							<TranscriptionItem
								// Handlers for updating start time, end time, and content
								handleStartTimeChange={(ev) =>
									updateTranscriptionItem(key, "start_time", ev)
								}
								handleEndTimeChange={(ev) =>
									updateTranscriptionItem(key, "end_time", ev)
								}
								handleContentChange={(ev) =>
									updateTranscriptionItem(key, "content", ev)
								}
								item={item} // Pass the current transcription item as a prop
							/>
						</div>
					))}
				</div>
			)}
		</>
	);
}
