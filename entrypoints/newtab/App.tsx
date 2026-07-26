import { Routes, Route } from "react-router-dom";

import Logo from "@/components/Logo";
import BackgroundImage from "@/components/BackgroundImage";
import Clock from "@/components/Clock";
import SalutationBox from "@/components/DaytimeSalutation";
import MultiSearch from "@/components/MultiSearch";

import { ThemeProvider } from "@/components/ThemeProvider";
import { SidebarSheetButton } from "@/components/SidebarSheet";
import { NotificationButton } from "@/components/NotificationButton";
import { FullscreenButton } from "@/components/FullscreenButton";
import { House, Gauge, LayoutGrid, ListTodo, Webhook, EarthLock } from "lucide-react";
import { NavMain } from "@/components/nav-main";
import { NavCommunityItems } from "@/components/nav-community-items";
import { NavUser } from "@/components/nav-user";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarInset, SidebarProvider, SidebarRail, SidebarTrigger } from "@/components/ui/sidebar";

import { Toaster } from "sonner";
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
		},
		{
			title: "Projects",
			url: "/projects",
			icon: EarthLock,
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
				<SidebarProvider defaultOpen={false}>
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
						<header className="App-header sticky top-0 z-50 flex h-15 items-center gap-3 bg-white/30 backdrop-blur dark:bg-slate-800/30 px-3">
							<SidebarTrigger className="-ml-1" />
							<ul className="ml-auto hidden items-center gap-3 md:flex">
								<li>
									<NotificationButton />
								</li>
								<li>
									<FullscreenButton />
								</li>
								<li>
									<SidebarSheetButton />
								</li>
							</ul>
						</header>

						<section className="flex flex-col items-center justify-center p-4">
							<div className="w-5xl mb-12">
								<Clock className="items-center justify-center gap-2 font-light mb-3" digitStyle="text-3xl text-shadow-lg" />
								<SalutationBox className="text-shadow-lg text-3xl items-center justify-start mb-8 mx-auto" />
								<MultiSearch className="w-full" />
							</div>
							<div className="w-5xl relative z-0">
								<Routes>
									<Route path="/" element={<DashboardPage />} />
									<Route path="/apps" element={<AppsPage />} />
									<Route path="/todos" element={<TodosPage />} />
									<Route path="/projects" element={<ProjectsPage />} />
								</Routes>
							</div>
						</section>
						<Toaster />
					</SidebarInset>
				</SidebarProvider>
			</BackgroundImage>
		</ThemeProvider>
	);
};

export default App;
