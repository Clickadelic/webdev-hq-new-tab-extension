import { Button } from "@/components/ui/button"
import { useImageStore } from "@/stores/use-image-store"
import { toast } from "sonner"
import { RefreshCcw } from "lucide-react"

export const GetRandomImageButton = () => {
	const { setImage } = useImageStore()

	const handleClick = () => {
		chrome.runtime.sendMessage({ action: "getRandomImage" }, response => {
			console.log("Full background image response:", response.response)

			if (!response || response.error) {
				toast.error("Error loading background image.")
				return
			}

			// Beispielzugriff auf das Objekt:
			const imageUrl = response.response?.urls?.regular
			const author = response.response?.user?.name || "Unbekannt"
			const authorUrl = response.response?.user?.links?.html || "#"
			const unsplashUrl = response.response?.links?.html || "#"

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
