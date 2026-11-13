import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { AiOutlineEdit } from "react-icons/ai"
import { BsTrash } from "react-icons/bs"
import { HiOutlineDotsVertical } from "react-icons/hi"

export interface SortableAppTileProps {
	app: {
		id: string
		title: string
		url: string
		icon: string
	}
	onEdit: (id: string) => void
	onDelete: (id: string) => void
	wasDragged: boolean
	setWasDragged: (val: boolean) => void
}

export const SortableAppTile = ({ app, onEdit, onDelete }: SortableAppTileProps) => {
	const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: app.id })

	const style = {
		transform: CSS.Transform.toString(transform),
		transition: transition
	}

	return (
		<li
			ref={setNodeRef}
			style={style}
			key={app.id}
			className="size-17.5 z-10 relative bg-white dark:bg-slate-800 pt-1 rounded transition-colors duration-150 ease-in-out border-transparent hover:border-primary hover:text-primary hover:cursor-pointer"
		>
			<div
				className="drag-handle absolute top-1 left-6 w-5 h-1.25 bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 inline-flex z-100 text-slate-600 dark:text-slate-300 rounded hover:cursor-move"
				{...listeners}
				{...attributes}
			/>
			<a href={app.url} target="_self" className="flex flex-col justify-between items-center p-2 gap-2" rel="noopener noreferrer">
				<img src={app.icon} alt={app.title} className="size-6 rounded-xs" />
				<span className="text-slate-800 dark:text-slate-300 text-xs inline-block truncate max-w-14">{app.title}</span>
			</a>
			<DropdownMenu modal={false}>
				<DropdownMenuTrigger asChild>
					<button className="z-50 absolute top-1 right-px text-slate-600 dark:text-slate-300 rounded-xs hover:text-slate-900 hover:bg-slate-200 hover:cursor-pointer dark:hover:bg-slate-600">
						<HiOutlineDotsVertical className="size-4" />
					</button>
				</DropdownMenuTrigger>

				<DropdownMenuContent side="right" align="start" className="rounded">
					<DropdownMenuItem>
						<button onClick={() => onEdit(app.id)} className="flex justify-between rounded">
							<AiOutlineEdit className="mt-1 mr-2" />
							{chrome.i18n.getMessage("edit", "Edit")}
						</button>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<button onClick={() => onDelete(app.id)} className="flex justify-between text-red-500 hover:text-red-700 rounded">
							<BsTrash className="text-red-500 hover:text-red-700 size-3 mt-1 mr-2" />
							{chrome.i18n.getMessage("delete", "Delete")}
						</button>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</li>
	)
}
