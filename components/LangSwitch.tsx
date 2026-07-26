import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { Button } from "@/components/ui/button"
import { PiTranslate } from "react-icons/pi"

export const LangSwitch = () => {
	return (
		<DropdownMenu modal={false}>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="hover:bg-slate-100 size-10 p-3 rounded">
					<PiTranslate className="size-5" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="md:w-[440px] mt-1 bg-white min-h-[300px] md:flex justify-around shadow-sm border p-8 gap-8">
				<div>
					<h3 className="text-md font-bold mb-3">Empty Column</h3>
					<ul className="list-disc ml-5">
						<li>
							<a href="#" className="mb-2 block hover:text-slate-500" target="_blank">
								Empty Slot
							</a>
						</li>
						<li>
							<a href="#" className="mb-2 block hover:text-slate-500" target="_blank">
								Empty Slot
							</a>
						</li>
						<li>
							<a href="#" className="mb-2 block hover:text-slate-500" target="_blank">
								Empty Slot
							</a>
						</li>
						<li>
							<a href="#" className="mb-2 block hover:text-slate-500" target="_blank">
								Empty Slot
							</a>
						</li>
					</ul>
				</div>
				<div>
					<span className="block font-bold mb-4">Empty Column</span>
					<ul className="list-disc ml-5">
						<li>
							<a href="#" className="mb-2 block hover:text-slate-500" target="_blank">
								Empty Slot
							</a>
						</li>
						<li>
							<a href="#" className="mb-2 block hover:text-slate-500" target="_blank">
								Empty Slot
							</a>
						</li>
						<li>
							<a href="#" className="mb-2 block hover:text-slate-500" target="_blank">
								Empty Slot
							</a>
						</li>
					</ul>
				</div>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
