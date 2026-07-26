import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { SlScreenDesktop } from "react-icons/sl"
interface EntrypointButtonProps {
	path: string // z.B. "dashboard.html"
	translationLabel: string // i18n translation string e.g. en.json
	params?: Record<string, string> // z.B. { page: "stats" }
	btnClasses?: string
}

const EntrypointButton: React.FC<EntrypointButtonProps> = ({ path, translationLabel, params, btnClasses }) => {
	const handleClick = () => {
		const url = new URL(chrome.runtime.getURL(path))

		if (params) {
			Object.entries(params).forEach(([key, value]) => {
				url.searchParams.set(key, value)
			})
		}

		chrome.tabs.create({ url: url.toString() })
	}

	return (
		<Button onClick={handleClick} className={cn(btnClasses)} title={(chrome.i18n.getMessage(translationLabel), "Toogle Fullscreen")}>
			<SlScreenDesktop />
		</Button>
	)
}

export default EntrypointButton
