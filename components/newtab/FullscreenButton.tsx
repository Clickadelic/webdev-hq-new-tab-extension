import { useState, useEffect } from "react"
import { BsArrowsFullscreen } from "react-icons/bs"
import { AiOutlineFullscreenExit } from "react-icons/ai"
import { Button } from "@/components/ui/button"

export const FullscreenButton = () => {
	const [isFullscreen, setIsFullscreen] = useState(false)

	useEffect(() => {
		const handleFullscreenChange = () => {
			setIsFullscreen(!!document.fullscreenElement)
		}

		document.addEventListener("fullscreenchange", handleFullscreenChange)

		return () => {
			document.removeEventListener("fullscreenchange", handleFullscreenChange)
		}
	}, [])

	const requestFullscreen = () => {
		if (document.fullscreenElement) {
			document.exitFullscreen().catch(err => console.error(err))
		} else {
			document.documentElement.requestFullscreen().catch(err => console.error(err))
		}
	}

	return (
		<Button onClick={requestFullscreen} variant="link" className="hover:bg-slate-100 size-10 p-3 rounded">
			{isFullscreen ? <AiOutlineFullscreenExit className="size-5" /> : <BsArrowsFullscreen className="size-5" />}
		</Button>
	)
}
