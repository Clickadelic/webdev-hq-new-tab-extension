import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import UserApps from "@/components/tabs-module/UserApps";
import UserHistory from "@/components/tabs-module/UserHistory";
import UserTodos from "@/components/tabs-module/UserTodos";
import UserDownloads from "@/components/tabs-module/UserDownloads";
import UserProjects from "@/components/tabs-module/UserProjects";

import { BsApp } from "react-icons/bs";
import { BsListCheck } from "react-icons/bs";
import { PiClockCountdown } from "react-icons/pi";
import { GoDownload } from "react-icons/go";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";

import { useSettingsStore } from "@/stores/use-settings-store";

interface TabsModuleProps {
	className?: string;
}

const TabsModule = ({ className }: TabsModuleProps) => {
	const defaultTab = useSettingsStore(state => state.defaultTab);

	return (
		<div className={className}>
			<Tabs defaultValue={defaultTab} className="w-full">
				<div className="bg-white/30 dark:bg-slate-800/30 p-1 rounded backdrop-blur">
					<TabsList className="grid grid-cols-5 w-full text-slate-600 h-11 dark:bg-slate-800 dark:text-slate-300">
						<TabsTrigger value="apps">
							<BsApp />
							{chrome.i18n.getMessage("apps", "Apps")}
						</TabsTrigger>
						<TabsTrigger value="todos">
							<BsListCheck />
							{chrome.i18n.getMessage("todos", "Todos")}
						</TabsTrigger>
						<TabsTrigger value="projects">
							<AiOutlineFundProjectionScreen />
							{chrome.i18n.getMessage("projects", "Projects")}
						</TabsTrigger>
						<TabsTrigger value="downloads">
							<GoDownload />
							{chrome.i18n.getMessage("downloads", "Downloads")}
						</TabsTrigger>
						<TabsTrigger value="history">
							<PiClockCountdown />
							{chrome.i18n.getMessage("history", "History")}
						</TabsTrigger>
					</TabsList>
				</div>
				<TabsContent value="apps">
					<UserApps />
				</TabsContent>
				<TabsContent value="todos">
					<UserTodos />
				</TabsContent>
				<TabsContent value="projects">
					<UserProjects />
				</TabsContent>
				<TabsContent value="downloads">
					<UserDownloads />
				</TabsContent>
				<TabsContent value="history">
					<UserHistory />
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default TabsModule;
