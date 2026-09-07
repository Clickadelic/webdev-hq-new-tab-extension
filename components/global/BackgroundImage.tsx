import { useEffect, useState } from "react";
import { useImageStore } from "@/stores/use-image-store";

import { cn } from "@/lib/utils";

interface BackgroundImageProps {
	classNames?: string;
	creditsPosition?: "left" | "center" | "right";
	children: React.ReactNode;
}

const BackgroundImage = ({ classNames, creditsPosition, children }: BackgroundImageProps) => {
	const { imageUrl, credit, setImage, resetImage } = useImageStore();
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);

	useEffect(() => {
		let canceled = false;
		resetImage();
		console.log("Sending getRandomImage message to background script");
		chrome.runtime.sendMessage({ action: "getRandomImage" }, response => {
			console.log("Raw response from background:", response);
			if (!response || response.error) {
				console.error("Error loading image:", response?.error);
				return;
			}

			// Aus dem kompletten Response-Objekt die wichtigen Felder extrahieren:
			const url = response.data.urls.raw || response.data.urls.full || response.data.urls.regular;
			if (!url) {
				console.error("No valid image URL received.");
				return;
			}

			// Blurred low-res preview immediately to avoid a blank screen
			const low = response.data.urls.small || response.data.urls.thumb;
			if (low && !canceled) {
				setPreviewUrl(low);
			}

			const author = response.data.user?.name || "Unbekannt";
			const authorUrl = response.data.user?.links?.html || "#";
			const unsplashUrl = response.data.links?.html || "#";

			// Preload the full image before showing it to avoid an image flash
			const img = new Image();
			img.onload = () => {
				if (canceled) return;
				setImage(url, {
					author,
					authorUrl,
					unsplashUrl
				});
			};
			img.onerror = () => console.error("Failed to preload image:", url);
			img.src = url;
		});

		return () => {
			canceled = true;
		};
	}, [setImage, resetImage]);

	return (
		<div className={cn("relative min-h-screen overflow-hidden", classNames)}>
			{/* Blurred low-res preview layer */}
			<div
				aria-hidden
				className="absolute inset-0 bg-cover bg-center bg-no-repeat"
				style={{
					backgroundImage: previewUrl ? `url(${previewUrl})` : undefined,
					filter: "blur(16px) brightness(0.9)",
					transform: "scale(1.06)",
					transition: "opacity 200ms ease-out",
					opacity: previewUrl ? 1 : 0
				}}
			/>
			{/* Hi-res layer fades in after preload */}
			<div
				aria-hidden
				className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out"
				style={{
					backgroundImage: imageUrl ? `url(${imageUrl})` : undefined,
					opacity: imageUrl ? 1 : 0
				}}
			/>
			<div className="relative z-10 min-h-screen">{children}</div>
			{credit && (
				<div className={creditsPosition === "center" ? "absolute bottom-4 left-1/2 z-20 -translate-x-1/2" : "absolute bottom-4 left-4 z-20"}>
					<p className="text-xs text-white">
						{chrome.i18n.getMessage("photo_by", "Photo by")}{" "}
						<a href={credit.authorUrl} target="_blank" rel="noreferrer" className="underline hover:text-blue-600">
							{credit.author}
						</a>{" "}
						{chrome.i18n.getMessage("on", "on")}{" "}
						<a href={credit.unsplashUrl} target="_blank" rel="noreferrer" className="underline hover:text-blue-600">
							Unsplash
						</a>
					</p>
				</div>
			)}
		</div>
	);
};

export default BackgroundImage;
