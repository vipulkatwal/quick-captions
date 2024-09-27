import SparklesIcon from "@/components/SparklesIcon";
import { transcriptionItemsToSrt } from "@/libs/awsTranscriptionHelpers"; // Import utility function to convert transcription items to SRT format
import { FFmpeg } from "@ffmpeg/ffmpeg"; // Import FFmpeg for video processing
import { toBlobURL, fetchFile } from "@ffmpeg/util"; // Import utilities for handling file blobs and fetching files
import { useEffect, useState, useRef } from "react";
import roboto from "./../fonts/Roboto-Regular.ttf";
import robotoBold from "./../fonts/Roboto-Bold.ttf";

export default function ResultVideo({ filename, transcriptionItems }) {
	const videoUrl = "https://vipul-quik-captions.s3.amazonaws.com/" + filename; // Construct the video URL
	const [loaded, setLoaded] = useState(false); // State to track if FFmpeg is loaded
	const [primaryColor, setPrimaryColor] = useState("#FFFFFF");
	const [outlineColor, setOutlineColor] = useState("#000000");
	const [progress, setProgress] = useState(1); // State for progress of the transcoding process
	const ffmpegRef = useRef(new FFmpeg()); // Ref to keep the FFmpeg instance
	const videoRef = useRef(null); // Ref to the video element
	const [ffmpegLoaded, setFfmpegLoaded] = useState(false); // State to track FFmpeg loading

	useEffect(() => {
		// Set video source and load FFmpeg when component mounts
		videoRef.current.src = videoUrl;
		loadFFmpeg();
	}, []);

	useEffect(() => {
		// Set a data attribute to avoid hydration warnings
		videoRef.current.setAttribute("data-video", 0);
	}, []);

	// to load FFmpeg and required fonts
	const loadFFmpeg = async () => {
		const ffmpeg = ffmpegRef.current;
		if (!ffmpegLoaded) {
			const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd";
			await ffmpeg.load({
				coreURL: await toBlobURL(
					`${baseURL}/ffmpeg-core.js`,
					"text/javascript"
				),
				wasmURL: await toBlobURL(
					`${baseURL}/ffmpeg-core.wasm`,
					"application/wasm"
				),
			});
			await ffmpeg.writeFile("/tmp/roboto.ttf", await fetchFile(roboto));
			await ffmpeg.writeFile(
				"/tmp/roboto-bold.ttf",
				await fetchFile(robotoBold)
			);
			setLoaded(true); // Update state when FFmpeg and fonts are loaded
			setFfmpegLoaded(true); // Mark FFmpeg as loaded
		}
	};

	// Convert RGB color to FFmpeg format
	function toFFmpegColor(rgb) {
		const bgr = rgb.slice(5, 7) + rgb.slice(3, 5) + rgb.slice(1, 3);
		return "&H" + bgr + "&";
	}

	// to transcode the video with subtitles
	const transcode = async () => {
		const ffmpeg = ffmpegRef.current;
		const srt = transcriptionItemsToSrt(transcriptionItems); // Convert transcription items to SRT format
		await ffmpeg.writeFile(filename, await fetchFile(videoUrl)); // Load video file into FFmpeg
		await ffmpeg.writeFile("subs.srt", srt); // Load SRT file into FFmpeg
		videoRef.current.src = videoUrl; // Set video source to ensure it plays
		await new Promise((resolve, reject) => {
			videoRef.current.onloadedmetadata = resolve; // Wait for video metadata to be loaded
		});
		const duration = videoRef.current.duration; // Get video duration

		// Monitor FFmpeg progress
		ffmpeg.on("log", ({ message }) => {
			const regexResult = /time=([0-9:.]+)/.exec(message);
			if (regexResult && regexResult[1]) {
				const [hours, minutes, seconds] = regexResult[1].split(":");
				const doneTotalSeconds = hours * 3600 + minutes * 60 + seconds;
				const videoProgress = doneTotalSeconds / duration;
				setProgress(videoProgress); // Update progress state
			}
		});

		// Run FFmpeg command to add subtitles and transcode video
		await ffmpeg.exec([
			"-i",
			filename,
			"-preset",
			"ultrafast",
			"-vf",
			`subtitles=subs.srt:fontsdir=/tmp:force_style='Fontname=Roboto Bold,FontSize=30,MarginV=70,PrimaryColour=${toFFmpegColor(
				primaryColor
			)},OutlineColour=${toFFmpegColor(outlineColor)}'`,
			"output.mp4",
		]);

		// Retrieve the transcoded video file
		const data = await ffmpeg.readFile("output.mp4");
		videoRef.current.src = URL.createObjectURL(
			new Blob([data.buffer], { type: "video/mp4" })
		); // Create a URL for the video file
		setProgress(1); // Set progress to 100% after processing
	};

	return (
		<>
			{/* Button to start the transcoding process */}
			<div className="mb-4">
				<button
					onClick={transcode}
					className="bg-green-600 py-2 px-6 rounded-full inline-flex gap-2 border-2 border-purple-700/50 cursor-pointer"
					disabled={!loaded} // Disable button until FFmpeg is loaded
				>
					<SparklesIcon />
					<span>Apply captions</span>
				</button>
			</div>

			{/* Color pickers for primary and outline colors */}
			<div>
				Primary Color:
				<input
					type="color"
					value={primaryColor}
					onChange={(ev) => setPrimaryColor(ev.target.value)}
				/>
				<br />
				Outline Color:
				<input
					type="color"
					value={outlineColor}
					onChange={(ev) => setOutlineColor(ev.target.value)}
				/>
			</div>

			{/* Video player and progress indicator */}
			<div className="rounded-xl overflow-hidden relative">
				{progress && progress < 1 && (
					<div className="absolute inset-0 bg-black/80 flex items-center">
						<div className="w-full text-center">
							<div className="bg-bg-gradient-from/50 mx-8 rounded-lg overflow-hidden relative">
								<div
									className="bg-bg-gradient-from h-8"
									style={{ width: progress * 100 + "%" }}
								>
									<h3 className="text-white text-xl absolute inset-0 py-1">
										{parseInt(progress * 100)}%
									</h3>
								</div>
							</div>
						</div>
					</div>
				)}
				<video ref={videoRef} controls aria-label="Result Video"></video>
			</div>
		</>
	);
}
