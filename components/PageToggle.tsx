import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useSettingsStore } from "@/stores/use-settings-store";
import { useState, useEffect } from "react";
import { Gauge, LayoutGrid, ListTodo, Webhook, EarthLock } from "lucide-react";
import { cn } from "@/lib/utils";
type Page = "dashboard" | "apps" | "todos" | "projects";

interface PageToggleProps {
	className?: string;
}
export function PageToggle({ className }: PageToggleProps) {
	const { setDefaultPage, defaultPage } = useSettingsStore();

	useEffect(() => {
		if (defaultPage) setDefaultPage(defaultPage);
	}, [defaultPage]);

	const handlePageChange = (val: string) => {
		if (val !== "Dasboard" && val !== "Apps" && val !== "Todos" && val !== "Projects") return;
		setDefaultPage(val);
	};
	return (
		<ToggleGroup type="single" value={defaultPage} className={cn("flex", className)} onValueChange={handlePageChange}>
			<ToggleGroupItem value="Dashboard" title={chrome.i18n.getMessage("dashboard", "Dashboard")}>
				<Gauge />
			</ToggleGroupItem>
			<ToggleGroupItem value="Apps" title={chrome.i18n.getMessage("apps", "Apps")}>
				<LayoutGrid />
			</ToggleGroupItem>
			<ToggleGroupItem value="Todos" title={chrome.i18n.getMessage("todos", "Todos")}>
				<ListTodo />
			</ToggleGroupItem>
			<ToggleGroupItem value="Todos" title={chrome.i18n.getMessage("projects", "Projects")}>
				<EarthLock />
			</ToggleGroupItem>
		</ToggleGroup>
	);
}
