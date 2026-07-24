import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { GoGear } from "react-icons/go"
import { Button } from "@/components/ui/button"

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
					<SheetTitle>Dashboard-Einstellungen</SheetTitle>
					<SheetDescription>Hintergrundbild, Logo und andere Einstellungen.</SheetDescription>
				</SheetHeader>
				Fields, etc...
			</SheetContent>
		</Sheet>
	)
}
