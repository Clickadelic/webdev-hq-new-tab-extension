import { useState } from "react";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { TooltipArrow } from "@radix-ui/react-tooltip";
import { TbSalt } from "react-icons/tb";
import { FiPlus } from "react-icons/fi";
import { BsJournalBookmark } from "react-icons/bs";

import { cn } from "@/lib/utils";

/**
 * A circular menu that appears on the bottom right of the screen when the user has the user role.
 * It contains buttons to create a new recipe and to view all ingredients.
 */
export function CircularMenu() {
	const [showCircularMenu, setShowCircularMenu] = useState<boolean>(false);
	return (
		<div className="fixed right-4 bottom-4 md:bottom-8 md:right-8 lg:bottom-12 lg:right-12 max-w-12 z-20">
			<div className={cn("absolute -top-24 left-1 flex flex-col items-center space-y-2 transition-all", showCircularMenu ? "opacity-100" : "opacity-0 pointer-events-none")}>
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild data-state="instant-open">
							<a className="rounded-full bg-primary hover:bg-primary/90 text-white p-3 hover:cursor-pointer shadow-lg" href="#">
								<BsJournalBookmark />
							</a>
						</TooltipTrigger>
						<TooltipContent side="left" className="text-white">
							<p>Neues Rezept</p>
							<TooltipArrow className="fill-primary dark:fill-primary" />
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>

				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild data-state="instant-open">
							<a className="rounded-full bg-primary hover:bg-primary/90 text-white p-3 hover:cursor-pointer shadow-lg" href="#">
								<TbSalt />
							</a>
						</TooltipTrigger>
						<TooltipContent side="left" className="text-white">
							<p>Neuer Hyperlink</p>
							<TooltipArrow className="fill-primary dark:fill-primary" />
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</div>

			{/* Haupt-Button */}
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild data-state="instant-open">
						<button
							aria-label={chrome.i18n.getMessage("create_new_content", "Create new content")}
							onClick={() => setShowCircularMenu(prev => !prev)}
							className="bg-primary hover:bg-primary/90 hover:cursor-pointer text-white p-4 text-lg rounded-full transition shadow-lg"
						>
							<FiPlus className={cn("transition-transform", showCircularMenu ? "rotate-45" : "")} />
						</button>
					</TooltipTrigger>
					<TooltipContent side="left" className="bg-primary text-white">
						<p>{chrome.i18n.getMessage("create_new_content", "Create new content")}</p>
						<TooltipArrow className="fill-primary" />
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		</div>
	);
}

export default CircularMenu;
