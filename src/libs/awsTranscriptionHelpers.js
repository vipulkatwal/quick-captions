// to clean up and consolidate transcription items
export function clearTranscriptionItems(items) {
	// Iterate through each transcription item
	items.forEach((item, key) => {
		// If an item does not have a start_time (likely a continuation of the previous sentence)
		if (!item.start_time) {
			const prev = items[key - 1]; // Get the previous item
			// Append the current item's content to the previous item's content
			prev.alternatives[0].content += item.alternatives[0].content;
			// Remove the current item from the list
			delete items[key];
		}
	});

	// Return the cleaned list with only the necessary properties
	return items.map((item) => {
		const { start_time, end_time } = item; // Destructure start_time and end_time
		const content = item.alternatives[0].content; // Extract the content from the first alternative
		return { start_time, end_time, content }; // Return a simplified object
	});
}

// to convert seconds (string format) to HH:MM:SS,MS format (SRT timestamp)
function secondsToHHMMSSMS(timeString) {
	const d = new Date(parseFloat(timeString) * 1000); // Convert seconds to milliseconds and create a Date object
	return d.toISOString().slice(11, 23).replace(".", ","); // Extract HH:MM:SS and format milliseconds with a comma
}

// to convert transcription items to SRT subtitle format
export function transcriptionItemsToSrt(items) {
	let srt = ""; // Initialize the SRT string
	let i = 1; // Sequence number for each subtitle entry

	// Filter out any undefined/null items and loop through the remaining items
	items
		.filter((item) => !!item)
		.forEach((item) => {
			// Add the sequence number
			srt += i + "\n";

			// Generate and add the timestamps
			const { start_time, end_time } = item; // Extract start and end times
			srt +=
				secondsToHHMMSSMS(start_time) + // Convert start time to SRT format
				" --> " +
				secondsToHHMMSSMS(end_time) + // Convert end time to SRT format
				"\n";

			// Add the subtitle content
			srt += item.content + "\n";
			srt += "\n"; // Add a blank line between subtitle entries
			i++; // Increment the sequence number
		});

	return srt; // Return the generated SRT string
}
