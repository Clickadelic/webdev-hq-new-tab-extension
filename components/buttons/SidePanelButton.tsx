import { Button } from "@/components/ui/button"
import { BsReverseLayoutSidebarInsetReverse } from "react-icons/bs"

export const SidePanelButton = () => {
	const handleClick = () => {
		if (!chrome?.sidePanel?.open || !chrome.windows) {
			alert("SidePanel API ist nicht verfügbar.")
			return
		}

		chrome.windows.getCurrent(window => {
			if (window?.id !== undefined) {
				chrome.sidePanel.open({ windowId: window.id }).catch(err => {
					console.error("Fehler beim Öffnen des Sidepanels:", err)
				})
			} else {
				console.error("Aktuelles Fenster konnte nicht ermittelt werden.")
			}
		})
	}

	return (
		<Button className="border border-transparent bg-white text-slate-800 hover:border-primary hover:bg-white hover:cursor-pointer" onClick={handleClick} title="Sidepanel öffnen">
			<BsReverseLayoutSidebarInsetReverse className="size-4" />
		</Button>
	)
}
