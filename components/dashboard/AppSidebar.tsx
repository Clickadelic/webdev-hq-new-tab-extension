import * as React from "react";
import { Grip, Map, PieChart, SquareTerminal } from "lucide-react";

import { NavMain } from "@/components/dashboard/nav-main";
import { NavCommunityItems } from "@/components/dashboard/nav-community-items";
import { NavUser } from "@/components/dashboard/nav-user";

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail, useSidebar } from "@/components/ui/sidebar";
import Logo from "../global/Logo";

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

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const { state } = useSidebar();
	const isCollapsed = state === "collapsed";

	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader className="flex items-center justify-center p-0">
				<Logo url={import.meta.env.WXT_HOMEPAGE_URL} isSidebarOpen={!isCollapsed} />
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
	);
}
