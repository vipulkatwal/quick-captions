import SparklesIcon from "@/components/SparklesIcon";

export default function DemoSection() {
	return (
		<section className="flex justify-around mt-8 sm:mt-12 items-center">
			{/* Hidden video for small screens, visible for larger screens */}
			<div className="hidden sm:block bg-gray-800/50 w-[240px] rounded-xl overflow-hidden">
				<video
					src="https://vipul-quik-captions.s3.amazonaws.com/fu8lzyf5z9n.mp4" // First video source URL
					muted // Mute the video by default
					autoPlay // Play the video automatically
					loop // Loop the video continuously
				></video>
			</div>

			{/* Decorative icon in the center, hidden on small screens */}
			<div className="hidden sm:block">
				<SparklesIcon /> {/* Render the sparkles icon */}
			</div>

			{/* Video visible on all screens */}
			<div className="bg-gray-800/50 w-[240px] rounded-xl overflow-hidden">
				<video
					src="https://vipul-quik-captions.s3.amazonaws.com/fu8lzyfrz4h.mp4" // Second video source URL
					preload // Preload the video for faster loading
					muted // Mute the video by default
					autoPlay // Play the video automatically
					loop // Loop the video continuously
				></video>
			</div>
		</section>
	);
}
