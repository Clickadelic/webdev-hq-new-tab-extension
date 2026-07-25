import { Routes, Route } from "react-router-dom";

import Logo from "@/components/Logo";
import BackgroundImage from "@/components/BackgroundImage";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AccountDropdown } from "@/components/AccountDropdown";
import { SidebarSheet } from "@/components/SidebarSheet";
import { MegaMenu } from "@/components/MegaMenu";
import { NotificationButton } from "@/components/NotificationButton";
import { InboxButton } from "@/components/InboxButton";
import { FullscreenButton } from "@/components/FullscreenButton";
import { LangSwitch } from "@/components/LangSwitch";
import { House, Gauge, LayoutGrid, ListTodo, Webhook } from "lucide-react";
import { NavMain } from "@/components/nav-main";
import { NavCommunityItems } from "@/components/nav-community-items";
import { NavUser } from "@/components/nav-user";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarInset, SidebarProvider, SidebarRail, SidebarTrigger } from "@/components/ui/sidebar";
import Clock from "@/components/Clock";
import SalutationBox from "@/components/SalutationBox";
import MultiSearch from "@/components/MultiSearch";
// Pages
import DashboardPage from "./pages/DashboardPage";
import AppsPage from "./pages/AppsPage";
import TodosPage from "./pages/TodosPage";
import ProjectsPage from "./pages/ProjectsPage";

const data = {
	navMain: [
		{
			title: "Dashboard",
			url: "/",
			icon: Gauge,
			isActive: true
		},
		{
			title: "Apps",
			url: "/apps",
			icon: LayoutGrid,
			isActive: false
		},
		{
			title: "Todos",
			url: "/todos",
			icon: ListTodo,
			isActive: false
		}
	],
	communityItems: [
		{ name: "Website", url: "https://webdev-hq.com", icon: House },
		{ name: "API", url: "https://api.webdev-hq.com", icon: Webhook }
	],
	user: {
		name: "shadcn",
		email: "shadcn@vercel.com",
		avatar: "/avatars/shadcn.jpg"
	}
};

const App = () => {
	return (
		<ThemeProvider>
			<BackgroundImage creditsPosition="center">
				<SidebarProvider>
					{/* Sidebar */}
					<Sidebar collapsible="icon">
						<SidebarHeader className="flex items-center justify-center p-0">
							<Logo url={`${import.meta.env.WXT_HOMEPAGE_URL}`} />
						</SidebarHeader>
						<SidebarContent className="pt-8">
							<NavMain items={data.navMain} />
							<NavCommunityItems communityItems={data.communityItems} />
						</SidebarContent>
						<SidebarFooter>
							<NavUser user={data.user} />
						</SidebarFooter>
						<SidebarRail />
					</Sidebar>

					{/* Main content — SidebarInset fills the remaining width automatically */}
					<SidebarInset className="bg-transparent">
						<header className="App-header sticky top-0 z-50 flex h-15 items-center gap-3 border-b bg-white px-3 dark:bg-neutral-900">
							<SidebarTrigger className="-ml-1" />
							<div className="flex flex-1 items-center gap-3">
								<form>
									<input className="w-72 rounded border border-black p-2" type="search" placeholder="Search" />
								</form>
							</div>
							<ul className="ml-auto hidden items-center gap-1 md:flex">
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

						<section className="flex flex-col items-center justify-center p-4">
							<div className="w-352">
								<Clock className="items-center justify-center gap-2 font-light mb-3" digitStyle="text-3xl text-shadow-lg" />
								<SalutationBox className="text-shadow-lg text-3xl items-center justify-center mb-8 mx-auto" />
								<MultiSearch className="mb-5" />
							</div>
							<Routes>
								<Route path="/" element={<DashboardPage />} />
								<Route path="/apps" element={<AppsPage />} />
								<Route path="/todos" element={<TodosPage />} />
								<Route path="/projects" element={<ProjectsPage />} />
							</Routes>
						</section>
					</SidebarInset>
				</SidebarProvider>
			</BackgroundImage>
		</ThemeProvider>
	);
};

export default App;
