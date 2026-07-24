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
		<Button
			onClick={requestFullscreen}
			className="border border-transparent bg-white text-slate-800 dark:bg-slate-800 dark:text-slate-300 hover:border-primary hover:text-primary hover:cursor-pointer"
			title={chrome.i18n.getMessage("fullscreen", "Fullscreen")}
		>
			{isFullscreen ? <AiOutlineFullscreenExit className="size-4" /> : <BsArrowsFullscreen className="size-4" />}
		</Button>
	)
}
