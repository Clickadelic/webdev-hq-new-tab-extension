import { Button } from "@/components/ui/button"
import { useAppStore } from "@/stores/use-app-store"
import { toast } from "sonner"

import { FaGoogle } from "react-icons/fa"
export const LoadGoogleAppsButton: React.FC = () => {
	const resetApps = useAppStore(state => state.resetApps)
	const resetGoogleApps = () => {
		resetApps()
		toast.success(chrome.i18n.getMessage("google_apps_loaded", "Google Apps loaded"))
	}
	return (
		<Button
			onClick={() => resetGoogleApps()}
			className="border border-slate-200 bg-white shadow-none text-slate-800 dark:text-slate-300 hover:border-primary hover:bg-white hover:cursor-pointer"
			title={chrome.i18n.getMessage("load_google_apps", "Load Google Apps")}
		>
			<FaGoogle className="size-4" />
		</Button>
	)
}
