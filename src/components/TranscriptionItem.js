export default function TranscriptionItem({
	item, // The transcription item being passed in
	handleStartTimeChange, // to handle changes to the start time
	handleEndTimeChange, // to handle changes to the end time
	handleContentChange, // to handle changes to the content
}) {
	// Return an empty string if the item is undefined or null (prevents errors)
	if (!item) {
		return "";
	}

	return (
		<div className="my-1 grid grid-cols-3 gap-1 items-center">
			{/* Input for the start time */}
			<input
				type="text"
				className="bg-white/20 p-1 rounded-md" // Styling for the input
				value={item.start_time} // The current start time value
				onChange={handleStartTimeChange} // Call the handler when the input changes
			/>

			{/* Input for the end time */}
			<input
				type="text"
				className="bg-white/20 p-1 rounded-md" // Styling for the input
				value={item.end_time} // The current end time value
				onChange={handleEndTimeChange} // Call the handler when the input changes
			/>

			{/* Input for the content */}
			<input
				type="text"
				className="bg-white/20 p-1 rounded-md" // Styling for the input
				value={item.content} // The current content value
				onChange={handleContentChange} // Call the handler when the input changes
			/>
		</div>
	);
}
