import DemoSection from "@/components/DemoSection";
import PageHeaders from "@/components/PageHeaders";
import UploadForm from "@/components/UploadForm";

export default function Home() {
	return (
		<>
			{/* Render the page headers with customizable text */}
			<PageHeaders
				h1Text={"Add quick captions to your videos"}
				h2Text={
					"Simply upload your video, and we'll handle the magic from there!"
				}
			/>
			{/* Center the upload form */}
			<div className="text-center">
				<UploadForm /> {/* Render the upload form component */}
			</div>
			{/* Render the demo section */}
			<DemoSection />
		</>
	);
}
