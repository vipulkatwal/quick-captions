import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import uniqid from "uniqid";

// Handle POST requests to upload a file to S3
export async function POST(req) {
	// Parse the form data from the request
	const formData = await req.formData();
	const file = formData.get("file"); // Get the file object from the form data
	const { name, type } = file; // Extract the file name and type
	const data = await file.arrayBuffer(); // Convert the file to an ArrayBuffer for uploading

	// Create a new S3 client with AWS credentials and region
	const s3client = new S3Client({
		region: "us-east-1", // Specify the AWS region
		credentials: {
			accessKeyId: process.env.AWS_ACCESS_KEY_ID, // Access key from environment variables
			secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_ID, // Secret key from environment variables
		},
	});

	// Generate a unique ID for the new file name
	const id = uniqid(); // Unique ID for the new file name
	const ext = name.split(".").slice(-1)[0]; // Extract the file extension
	const newName = id + "." + ext; // Create a new file name with the unique ID and original extension

	// Create a command to upload the file to S3
	const uploadCommand = new PutObjectCommand({
		Bucket: process.env.BUCKET_NAME_ID, // S3 bucket name
		Body: data, // File data to upload
		ACL: "public-read", // Set the file to be publicly readable
		ContentType: type, // MIME type of the file
		Key: newName, // New name for the file in S3
	});

	// Send the upload command to S3
	await s3client.send(uploadCommand);

	// Return a JSON response with file information
	return Response.json({ name, ext, newName, id });
}
