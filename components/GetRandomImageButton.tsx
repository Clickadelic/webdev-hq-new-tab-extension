import { Button } from "@/components/ui/button"
import { useImageStore } from "@/stores/use-image-store"
import { toast } from "sonner"
import { RefreshCcw } from "lucide-react"

export const GetRandomImageButton = () => {
	const { setImage } = useImageStore()

	const handleClick = () => {
		chrome.runtime.sendMessage({ action: "getRandomImage" }, response => {
			if (chrome.runtime.lastError) {
				console.error("Background image request failed:", chrome.runtime.lastError.message)
				toast.error("Could not contact the background image service.")
				return
			}

			if (!response || response.error) {
				console.error("Background image service error:", response?.error)
				toast.error("Error loading background image.")
				return
			}

			const image = response.data
			const imageUrl = image?.urls?.raw || image?.urls?.full || image?.urls?.regular
			const author = image?.user?.name || "Unknown"
			const authorUrl = image?.user?.links?.html || "#"
			const unsplashUrl = image?.links?.html || "#"

			if (!imageUrl) {
				toast.error("Received invalid image URL.")
				return
			}

			setImage(imageUrl, {
				author,
				authorUrl,
				unsplashUrl
			})

			toast.success("Background image updated.")
		})
	}

	return (
		<Button onClick={handleClick} variant="secondary" className="flex gap-2 items-center shadow-md hover:scale-105 transition-transform duration-200" aria-label="Refresh Background Image">
			<RefreshCcw className="w-4 h-4" />
		</Button>
	)
}
