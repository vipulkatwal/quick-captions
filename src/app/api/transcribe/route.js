import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import {
	GetTranscriptionJobCommand,
	StartTranscriptionJobCommand,
	TranscribeClient,
} from "@aws-sdk/client-transcribe";

export const dynamic = "force-dynamic";

// Initialize a new AWS Transcribe client with credentials and region
function getClient() {
	return new TranscribeClient({
		region: "us-east-1", // Specify AWS region
		credentials: {
			accessKeyId: process.env.AWS_ACCESS_KEY_ID, // Access key from environment variables
			secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_ID, // Secret key from environment variables
		},
	});
}

// Create a command to start a transcription job for a given file
function createTranscriptionCommand(filename) {
	return new StartTranscriptionJobCommand({
		TranscriptionJobName: filename, // Name of the transcription job
		OutputBucketName: process.env.BUCKET_NAME_ID, // S3 bucket name for storing output
		OutputKey: filename + ".transcription", // Key for the output file in S3
		IdentifyLanguage: true, // Enable automatic language detection
		Media: {
			MediaFileUri: "s3://" + process.env.BUCKET_NAME_ID + "/" + filename, // URI of the media file in S3
		},
	});
}

// Start a new transcription job using the Transcribe client
async function createTranscriptionJob(filename) {
	const transcribeClient = getClient(); // Get the Transcribe client
	const transcriptionCommand = createTranscriptionCommand(filename); // Create the transcription command
	return transcribeClient.send(transcriptionCommand); // Send the command to start the job
}

// Get the status of an existing transcription job
async function getJob(filename) {
	const transcribeClient = getClient(); // Get the Transcribe client
	let jobStatusResult = null;
	try {
		const transcriptionJobStatusCommand = new GetTranscriptionJobCommand({
			TranscriptionJobName: filename, // Name of the transcription job
		});
		jobStatusResult = await transcribeClient.send(
			transcriptionJobStatusCommand
		); // Send the command to get job status
	} catch (e) {
		// Handle any errors that occur during the request
	}
	return jobStatusResult; // Return the job status result
}

// Convert a readable stream to a string
async function streamToString(stream) {
	const chunks = []; // Array to hold chunks of data
	return new Promise((resolve, reject) => {
		stream.on("data", (chunk) => chunks.push(Buffer.from(chunk))); // Collect data chunks
		stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8"))); // Concatenate chunks and resolve promise
		stream.on("error", reject); // Reject promise on error
	});
}

// Retrieve the transcription file from S3
async function getTranscriptionFile(filename) {
	const transcriptionFile = filename + ".transcription"; // File key for the transcription file
	const s3client = new S3Client({
		region: "us-east-1", // Specify AWS region
		credentials: {
			accessKeyId: process.env.AWS_ACCESS_KEY_ID, // Access key from environment variables
			secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_ID, // Secret key from environment variables
		},
	});
	const getObjectCommand = new GetObjectCommand({
		Bucket: process.env.BUCKET_NAME_ID, // S3 bucket name
		Key: transcriptionFile, // Key for the transcription file
	});
	let transcriptionFileResponse = null;
	try {
		transcriptionFileResponse = await s3client.send(getObjectCommand); // Send command to get the object from S3
	} catch (e) {
		// Handle any errors that occur during the request
	}
	if (transcriptionFileResponse) {
		// If the response is successful, convert the stream to a string and parse it as JSON
		return JSON.parse(await streamToString(transcriptionFileResponse.Body));
	}
	return null; // Return null if no response
}

// Handle GET requests to check or create transcription jobs
export async function GET(req) {
	const url = new URL(req.url); // Parse the request URL
	const searchParams = new URLSearchParams(url.searchParams); // Get search parameters
	const filename = searchParams.get("filename"); // Extract the filename parameter

	// Attempt to retrieve a completed transcription file
	const transcription = await getTranscriptionFile(filename);
	if (transcription) {
		// If transcription file is found, return its status as "COMPLETED"
		return Response.json({
			status: "COMPLETED",
			transcription,
		});
	}

	// Check if a transcription job is already in progress
	const existingJob = await getJob(filename);

	if (existingJob) {
		// Return the status of the existing job
		return Response.json({
			status: existingJob.TranscriptionJob.TranscriptionJobStatus,
		});
	}

	// If no existing job, create a new transcription job
	if (!existingJob) {
		const newJob = await createTranscriptionJob(filename);
		return Response.json({
			status: newJob.TranscriptionJob.TranscriptionJobStatus,
		});
	}

	// Return null if no transcription job was created
	return Response.json(null);
}
