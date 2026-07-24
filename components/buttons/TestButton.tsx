import { Button } from "@/components/ui/button"

export const TestButton = () => {
	const handleTestClick = () => {
		chrome.runtime.sendMessage({ action: "getRandomImage" }, response => {
			console.log("Full response:", response)
		})
	}
	return (
		<Button variant="secondary" className="w-48 my-12 p-4 mx-auto" onClick={handleTestClick}>
			Get random image
		</Button>
	)
}
