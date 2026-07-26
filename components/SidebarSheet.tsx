import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { GoGear } from "react-icons/go";
import { Button } from "@/components/ui/button";
import { HiOutlineCog } from "react-icons/hi";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ImportAppsButton } from "@/components/buttons/ImportAppsButton";
import { ExportAppsButton } from "@/components/buttons/ExportAppsButton";
import { DeleteAllAppsButton } from "@/components/buttons/DeleteAllAppsButton";
import { SelectDefaultTab } from "@/components/buttons/SelectDefaultTab";
import { LoadGoogleAppsButton } from "./buttons/LoadGoogleAppsButton";
export const SidebarSheet = () => {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="ghost" className="rounded-xs hover:bg-slate-100 size-10">
					<GoGear className="size-5" />
				</Button>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader className="mb-5">
					<SheetTitle>{chrome.i18n.getMessage("settings", "Settings")}</SheetTitle>
					<SheetDescription>{chrome.i18n.getMessage("make_adjustments", "Make adjustments to your NewTab")}.</SheetDescription>
				</SheetHeader>
				<div className="p-3">
					<div>
						<p className="mt-2 text-muted-foreground">{chrome.i18n.getMessage("general_default_tab_settings_text", "Select your default tab.")}</p>
						<SelectDefaultTab />
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
				</div>
			</SheetContent>
		</Sheet>
	);
};
