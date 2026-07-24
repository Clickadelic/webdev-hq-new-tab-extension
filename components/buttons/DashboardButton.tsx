import { Button } from "@/components/ui/button"
import { SlScreenDesktop } from "react-icons/sl"

export const DashboardButton: React.FC = () => {
	const handleClick = () => {
		const url = new URL(chrome.runtime.getURL("/dashboard.html"))
		chrome.tabs.create({ url: url.toString() })
	}

	return (
		<Button
			onClick={handleClick}
			className="border border-transparent rounded px-3 py-2 bg-white text-slate-800 dark:bg-slate-800 dark:text-slate-300 hover:border-primary hover:text-primary hover:cursor-pointer"
			title={chrome.i18n.getMessage("open_dashboard", "Open dashboard")}
		>
			<SlScreenDesktop className="size-4" />
		</Button>
	)
}
