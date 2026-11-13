import { Button } from "@/components/ui/button"
import { useAppStore } from "@/stores/use-app-store" // Pfad ggf. anpassen
import { BsTrash } from "react-icons/bs"
import { toast } from "sonner"
export const DeleteAllAppsButton = () => {
	const apps = useAppStore(state => state.apps)

	const deleteAllApps = () => {
		if (window.confirm("Are you sure you want to delete all apps?")) {
			useAppStore.setState({ apps: [] })
			toast.success(chrome.i18n.getMessage("all_apps_deleted", "Google Apps deleted."))
		}
	}

	return (
		<Button
			className="border border-slate-200 bg-white shadow-none text-slate-800 dark:text-slate-300 hover:border-rose-400 hover:bg-white hover:cursor-pointer"
			onClick={deleteAllApps}
			title={chrome.i18n.getMessage("delete_all_apps", "Delete all apps")}
		>
			<BsTrash className="size-4" />
		</Button>
	)
}
