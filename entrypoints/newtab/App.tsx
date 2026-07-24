import * as React from "react";
import { Routes, Route } from "react-router-dom";

import BackgroundImage from "@/components/global/BackgroundImage";

import { SidebarProvider } from "@/components/ui/sidebar";

import DashboardPage from "../newtab/pages/DashboardPage";

import { useState } from "react";

import { BsTextIndentRight } from "react-icons/bs";
import { BsTextIndentLeft } from "react-icons/bs";
import { HiMenuAlt3 } from "react-icons/hi";
import { ThemeProvider } from "@/components/global/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { AccountDropdown } from "@/components/newtab/AccountDropdown";
import { SidebarSheet } from "@/components/newtab/SidebarSheet";
import { MegaMenu } from "@/components/newtab/MegaMenu";
import { NotificationButton } from "@/components/newtab/NotificationButton";
import { InboxButton } from "@/components/newtab/InboxButton";
import { FullscreenButton } from "@/components/newtab/FullscreenButton";
import { LangSwitch } from "@/components/newtab/LangSwitch";
import { Grip, Map, PieChart, SquareTerminal } from "lucide-react";

import { NavMain } from "@/components/newtab/nav-main";
import { NavCommunityItems } from "@/components/newtab/nav-community-items";
import { NavUser } from "@/components/newtab/nav-user";

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar";

import { SidebarTrigger } from "@/components/ui/sidebar";

import Logo from "@/components/global/Logo";
import { cn } from "@/lib/utils";

const App = () => {
	const data = {
		user: {
			name: "shadcn",
			email: "shadcn@vercel.com",
			avatar: "/avatars/shadcn.jpg"
		},
		navMain: [
			{
				title: "Dashboard",
				url: "/",
				icon: SquareTerminal,
				isActive: true,
				items: [
					{
						title: "Overview",
						url: "#"
					},
					{
						title: "Apps",
						url: "#apps"
					},
					{
						title: "Todos",
						url: "#todos"
					},
					{
						title: "Projects",
						url: "#projects"
					}
				]
			}
		],
		communityItems: [
			{
				name: "News",
				url: "#",
				icon: Grip
			}
		]
	};
	const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);

	const toggleSidebar = () => {
		setSidebarOpen(!isSidebarOpen);
	};
	return (
		<ThemeProvider>
			<BackgroundImage creditsPosition="center">
				<SidebarProvider>
					<aside className={cn("App-sidebar hidden fixed md:block top-0 left-0 min-h-screen bg-white")}>
						<Sidebar collapsible="icon">
							<SidebarHeader className="flex items-center justify-center p-0">
								<Logo url={`${import.meta.env.WXT_HOMEPAGE_URL}`} isSidebarOpen={isSidebarOpen} />
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
					</aside>
					<header className={cn("App-header flex fixed top-0 md:ml-64 w-screen h-15 p-3 border-b bg-white dark:bg-neutral-900 z-50")}>
						<nav className="header-nav flex justify-between w-max">
							<div className="inline-flex gap-3">
								<SidebarTrigger variant="ghost" size="sm" className="rounded-xs">
									<BsTextIndentRight className="text-2xl" />
								</SidebarTrigger>
								<form>
									<input className="p-2 border rounded w-72 border-black" type="search" placeholder="Search" />
								</form>
							</div>
							<ul className="hidden md:space-x-1 md:fixed md:right-5 md:mt-.5 md:inline-flex md:mr-1 mb-1">
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
						</nav>
					</header>
					<main className="container mx-auto mt-32">
						<Routes>
							{/* Hashrouter is ready, just add routes */}
							<Route path="/" element={<DashboardPage />} />
						</Routes>
					</main>
				</SidebarProvider>
			</BackgroundImage>
		</ThemeProvider>
	);
};

export default App;
