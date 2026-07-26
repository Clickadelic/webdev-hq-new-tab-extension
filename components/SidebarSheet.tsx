import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { GoGear } from "react-icons/go";
import { Button } from "@/components/ui/button";
import { ImportAppsButton } from "@/components/buttons/ImportAppsButton";
import { ExportAppsButton } from "@/components/buttons/ExportAppsButton";
import { DeleteAllAppsButton } from "@/components/buttons/DeleteAllAppsButton";
import { LoadGoogleAppsButton } from "./buttons/LoadGoogleAppsButton";
import { ModeToggle } from "@/components/ModeToggle";
import { PageToggle } from "@/components/PageToggle";

export const SidebarSheetButton = () => {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="blank">
					<GoGear className="size-6" />
				</Button>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader className="mb-5">
					<SheetTitle>{chrome.i18n.getMessage("settings", "Settings")}</SheetTitle>
					<SheetDescription>{chrome.i18n.getMessage("make_adjustments", "Make adjustments to your NewTab")}.</SheetDescription>
				</SheetHeader>
				<div className="flex flex-col gap-3 p-3">
					<div className="flex justify-between items-start gap-2">
						<PageToggle className="w-full" />
						<p className="mt-2 text-muted-foreground">{chrome.i18n.getMessage("default_module", "Select your preferred default module.")}</p>
					</div>
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
					<div className="flex justify-between gap-2">
						<p className="mt-2 text-muted-foreground">{chrome.i18n.getMessage("light_or_darkmode", "Select your preferred theme.")}</p>
						<ModeToggle />
					</div>
				</div>
			</SheetContent>
		</Sheet>
	);
};
