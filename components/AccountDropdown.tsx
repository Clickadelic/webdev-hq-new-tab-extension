import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { FaCircleUser } from "react-icons/fa6";
export const AccountDropdown = () => {
	return (
		<DropdownMenu modal={false}>
			<DropdownMenuTrigger className="flex justify-between p-3 bg-white dark:bg-slate-800 text-slate-800 dark:text-white hover:bg-slate-100 rounded-xs">
				<FaCircleUser className="text-slate-800 dark:text-white size-5" />
				<span className="ml-2 text-slate-800 dark:text-white">Username</span>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="mr-3">
				<DropdownMenuLabel>{chrome.i18n.getMessage("my_account", "My Account")}</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<a href="/mein-profil" title="Zum Profil">
						Mein Profil
					</a>
				</DropdownMenuItem>
				<DropdownMenuItem>
					<a href="/organisationen" title="Zum Profil">
						Organisationen
					</a>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<a href="/">{chrome.i18n.getMessage("logout", "Logout")}</a>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
