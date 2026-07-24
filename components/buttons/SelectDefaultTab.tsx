import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useSettingsStore } from "@/stores/use-settings-store"
import { toast } from "sonner"

export const SelectDefaultTab = () => {
	const defaultTab = useSettingsStore(state => state.defaultTab)
	const setDefaultTab = useSettingsStore(state => state.setDefaultTab)

	const handleValueChange = (value: string) => {
		try {
			setDefaultTab(value)
			toast.success(chrome.i18n.getMessage("default_tab_changed", "Default tab changed successfully!"))
		} catch (error) {
			toast.error(chrome.i18n.getMessage("default_tab_change_error", "Error changing default tab."))
			console.error("Error changing default tab:", error)
		}
	}

	return (
		<Select value={defaultTab} onValueChange={handleValueChange}>
			<SelectTrigger className="w-40 rounded border border-gray-300 dark:border-gray-600 data-[state=open]:border-primary focus:outline-none focus:ring-2 focus:ring-primary">
				<SelectValue placeholder={chrome.i18n.getMessage(defaultTab, defaultTab)} />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="apps">{chrome.i18n.getMessage("apps", "Apps")}</SelectItem>
				<SelectItem value="todos">{chrome.i18n.getMessage("todos", "Todos")}</SelectItem>
				<SelectItem value="projects">{chrome.i18n.getMessage("projects", "Projects")}</SelectItem>
				<SelectItem value="downloads">{chrome.i18n.getMessage("downloads", "Downloads")}</SelectItem>
				<SelectItem value="history">{chrome.i18n.getMessage("history", "History")}</SelectItem>
			</SelectContent>
		</Select>
	)
}
