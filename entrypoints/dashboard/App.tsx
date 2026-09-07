import { Routes, Route } from "react-router-dom";

import BackgroundImage from "@/components/global/BackgroundImage";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/AppSidebar";
import DashboardPage from "./pages/DashboardPage";

import { AccountDropdown } from "@/components/dashboard/AccountDropdown";
import { SidebarSheet } from "@/components/dashboard/SidebarSheet";
import { MegaMenu } from "@/components/dashboard/MegaMenu";
import { NotificationButton } from "@/components/dashboard/NotificationButton";
import { InboxButton } from "@/components/dashboard/InboxButton";
import { FullscreenButton } from "@/components/dashboard/FullscreenButton";
import { LangSwitch } from "@/components/dashboard/LangSwitch";

import { Input } from "@/components/ui/input";

const App = () => {
	return (
		<BackgroundImage creditsPosition="center">
			<SidebarProvider>
				<AppSidebar />
				<SidebarInset className="bg-transparent">
					<header className="sticky top-0 z-50 flex h-15 shrink-0 items-center gap-2 bg-white px-4">
						<SidebarTrigger className="-ml-1" />
						<form className="flex-1">
							<Input className="w-72" type="search" placeholder="Search" />
						</form>
						<ul className="flex items-center gap-1">
							<li>
								<MegaMenu />
							</li>
							<li>
								<LangSwitch />
							</li>
							<li>
								<NotificationButton />
							</li>
							<li>
								<InboxButton />
							</li>
							<li>
								<FullscreenButton />
							</li>
							<li>
								<SidebarSheet />
							</li>
							<li>
								<AccountDropdown />
							</li>
						</ul>
					</header>
					<main className="flex-1 p-6">
						<Routes>
							<Route path="/" element={<DashboardPage />} />
						</Routes>
					</main>
				</SidebarInset>
			</SidebarProvider>
		</BackgroundImage>
	);
};

export default App;
