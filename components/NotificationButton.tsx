import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { Button } from "@/components/ui/button"
import { IoIosNotificationsOutline } from "react-icons/io"

export const NotificationButton = () => {
	return (
		<DropdownMenu modal={false}>
			<DropdownMenuTrigger asChild>
				<Button variant="link" className="hover:bg-slate-100 size-10 p-3 rounded">
					<IoIosNotificationsOutline className="size-5" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-[400px] p-3 overflow-hidden bg-white rounded-sm shadow-sm border">
				<h4 className="flex justify-between font-medium text-md mb-4 p-2">
					<span>Nachrichten</span>
					<span>3</span>
				</h4>
				<ul className="space-y-1">
					<li className="p-2 text-slate-700">Dein Gewinn im Lotto</li>
					<li className="p-2 text-slate-700">Deine Steuererklärung</li>
					<li className="p-2 text-slate-700">Dein Bürgergeldantrag</li>
				</ul>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
