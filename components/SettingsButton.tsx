import { HiOutlineCog } from "react-icons/hi";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ModeToggle } from "@/components/ModeToggle";

import { LoadGoogleAppsButton } from "@/components/LoadGoogleAppsButton";
import { ImportAppsButton } from "@/components/ImportAppsButton";
import { ExportAppsButton } from "@/components/ExportAppsButton";
import { DeleteAllAppsButton } from "@/components/DeleteAllAppsButton";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

interface SettingsButtonProps {
	className?: string;
}

export default function SettingsButton({ className }: SettingsButtonProps) {
	return (
		<div className={cn("bg-white/30 dark:bg-neutral-900/30 p-1 rounded-full backdrop-blur", className)}>
			<Dialog>
				<DialogTrigger asChild>
					<Button variant="ghost" className="rounded-full py-5">
						<HiOutlineCog className="size-4" />
					</Button>
				</DialogTrigger>
				<DialogContent className="fixed top-1/2 left-1/2 z-50 transform -translate-x-1/2 -translate-y-1/2">
					<DialogHeader>
						<DialogTitle className="flex items-start gap-2">
							<HiOutlineCog className="mt-.5 size-4" />
							{chrome.i18n.getMessage("settings_title", "Settings")}
						</DialogTitle>
						<DialogDescription>{chrome.i18n.getMessage("settings_description", "Manage your settings")}</DialogDescription>
					</DialogHeader>
					<div className="space-y-2">
						<div className="space-y-2">
							<h3>Apps</h3>
							<div className="flex justify-between gap-2">
								<p className="mt-2 text-muted-foreground">{chrome.i18n.getMessage("load_google_apps_settings_text", "Load Google Apps as default set.")}</p>
								<LoadGoogleAppsButton />
							</div>
							<div className="flex justify-between gap-2">
								<p className="mt-2 text-muted-foreground">{chrome.i18n.getMessage("import_apps_settings_text", "Import all apps.")}</p>
								<ImportAppsButton />
							</div>
							<div className="flex justify-between gap-2">
								<p className="mt-2 text-muted-foreground">{chrome.i18n.getMessage("export_apps_settings_text", "Export all apps.")}</p>
								<ExportAppsButton />
							</div>
							<div className="flex justify-between gap-2">
								<p className="mt-2 text-muted-foreground">{chrome.i18n.getMessage("delete_all_apps_settings_text", "Delete all apps.")}</p>
								<DeleteAllAppsButton />
							</div>
						</div>
						<div>
							<h3>Appearance</h3>
							<div className="flex justify-between gap-2">
								<p className="mt-2 text-muted-foreground">{chrome.i18n.getMessage("appearance_color_mode_settings_text", "Choose color mode (light/dark/system).")}</p>
								<ModeToggle />
							</div>
						</div>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
}
