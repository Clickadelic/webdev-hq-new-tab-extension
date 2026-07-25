import * as z from "zod";

import type { DragEndEvent } from "@dnd-kit/core";
import type { DragStartEvent } from "@dnd-kit/core";

import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, DragOverlay } from "@dnd-kit/core";
import { arrayMove, SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

import { useAppStore, AppType } from "@/stores/use-app-store";
import { AppSchema } from "@/schemas";

import { Plus } from "lucide-react";
import { BsApp } from "react-icons/bs";
import { TbEdit } from "react-icons/tb";

import { FormError } from "@/components/forms/form-error";
import { FormSuccess } from "@/components/forms/form-success";
import { toast } from "sonner";
import { getFaviconUrl } from "@/lib/utils";

import { SortableAppTile } from "./SortableAppTile";

const UserApps = () => {
	const { apps, addApp, editApp, removeApp } = useAppStore();
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const [editingAppId, setEditingAppId] = useState<string | null>(null);
	const [error, setError] = useState<string | undefined>("");
	const [success, setSuccess] = useState<string | undefined>("");
	const [draggingApp, setDraggingApp] = useState<AppType | null>(null);

	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 8 // minimale Bewegung zum Starten von Drag (z.B. um Klick vs. Drag zu unterscheiden)
			}
		})
	);

	const handleDragStart = (event: DragStartEvent) => {
		const activeId = event.active.id;
		const found = apps.find(app => app.id === activeId);
		if (found) {
			setDraggingApp(found);
		}
	};

	const handleDragEnd = ({ active, over }: DragEndEvent) => {
		setDraggingApp(null);

		if (!over || active.id === over.id) return;

		const oldIndex = apps.findIndex(app => app.id === active.id);
		const newIndex = apps.findIndex(app => app.id === over.id);

		if (oldIndex !== -1 && newIndex !== -1) {
			const newApps = arrayMove(apps, oldIndex, newIndex);
			useAppStore.getState().reorderApps(newApps);
		}
	};

	let form = useForm<z.infer<typeof AppSchema>>({
		resolver: zodResolver(AppSchema),
		defaultValues: { title: "", url: "" }
	});

	const onAddSubmit = (values: z.infer<typeof AppSchema>) => {
		setError("");
		setSuccess("");
		setIsLoading(true);
		const newApp = { id: crypto.randomUUID(), ...values, icon: getFaviconUrl(values.url) };
		addApp(newApp);
		setSuccess(chrome.i18n.getMessage("app_added", "App added successfully."));
		toast.success(chrome.i18n.getMessage("app_added", "App added successfully."));
		form.reset();
		setTimeout(() => {
			setIsLoading(false);
			setIsModalOpen(false);
			setSuccess("");
		}, 1250);
	};

	const onDelete = (id: string) => {
		removeApp(id);
		toast.success(chrome.i18n.getMessage("app_deleted", "App deleted successfully."));
	};

	const onEdit = (id: string) => {
		setIsEditing(true);
		setIsModalOpen(true);
		setEditingAppId(id);

		const currentApp = apps.find(app => app.id === id);
		if (currentApp) {
			form.setValue("title", currentApp.title);
			form.setValue("url", currentApp.url);
		}
	};

	const onEditSubmit = (values: z.infer<typeof AppSchema>) => {
		if (!editingAppId) return;

		setError("");
		setSuccess("");
		setIsLoading(true);

		const currentApp = apps.find(app => app.id === editingAppId);
		if (currentApp) {
			const updatedApp = {
				id: currentApp.id,
				title: values.title,
				url: values.url,
				icon: getFaviconUrl(values.url)
			};
			editApp(updatedApp);
		}

		setSuccess(chrome.i18n.getMessage("app_edited", "App edited successfully."));
		toast.success(chrome.i18n.getMessage("app_edited", "App edited successfully."));
		form.reset();
		setEditingAppId(null);
		setIsEditing(false);
		setTimeout(() => {
			setIsLoading(false);
			setIsModalOpen(false);
			setSuccess("");
		}, 1250);
	};

	return (
		<DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
			<SortableContext items={apps.map(app => app.id)} strategy={rectSortingStrategy}>
				<ul className="w-full grid grid-cols-14 gap-1 p-1 bg-white/30 dark:bg-slate-800/30 rounded backdrop-blur">
					{apps.map(app => (
						<SortableAppTile key={app.id} app={app} onEdit={onEdit} onDelete={onDelete} wasDragged={isEditing} setWasDragged={setIsEditing} />
					))}
					<li>
						<Dialog
							open={isModalOpen}
							onOpenChange={open => {
								setIsModalOpen(open);
								if (!open) {
									setIsEditing(false);
									setEditingAppId(null);
									form.reset();
								}
							}}
						>
							<DialogTrigger
								onClick={() => setIsModalOpen(true)}
								className="flex flex-col gap-1 items-center place-content-center text-slate-400 dark:text-slate-300 bg-white dark:bg-slate-800 p-2 size-17.5 rounded border transition-colors duration-150 ease-in-out border-transparent hover:border-primary hover:text-primary hover:cursor-pointer"
							>
								<Plus />
							</DialogTrigger>
							<DialogContent className="rounded">
								<DialogHeader>
									<DialogTitle className="flex items-start gap-2">
										<BsApp />
										{isEditing ? chrome.i18n.getMessage("edit_app_title", "Edit App") : chrome.i18n.getMessage("add_app_title", "Add App")}
									</DialogTitle>
									<DialogDescription>
										{isEditing ? chrome.i18n.getMessage("edit_app_description") : chrome.i18n.getMessage("add_app_description", "Add a new app to your list.")}
									</DialogDescription>
								</DialogHeader>
								<div className="flex">
									<Form {...form}>
										<form onSubmit={form.handleSubmit(isEditing ? onEditSubmit : onAddSubmit)} className="w-full space-y-6">
											<div className="space-y-4">
												<FormField
													control={form.control}
													name="title"
													render={({ field }) => (
														<FormItem>
															<FormLabel>{chrome.i18n.getMessage("app_title", "Title")}:</FormLabel>
															<FormControl>
																<Input type="text" {...field} placeholder={chrome.i18n.getMessage("app_title_placeholder", "Title")} />
															</FormControl>
															<FormMessage />
														</FormItem>
													)}
												/>
												<FormField
													control={form.control}
													name="url"
													render={({ field }) => (
														<FormItem>
															<FormLabel>{chrome.i18n.getMessage("app_url", "Url")}:</FormLabel>
															<FormControl>
																<Input type="url" {...field} placeholder={chrome.i18n.getMessage("app_url_placeholder", "https://...")} />
															</FormControl>
															<FormMessage />
														</FormItem>
													)}
												/>
											</div>
											<FormError message={error} />
											<FormSuccess message={success} />
											<Button variant="primary" type="submit" className="w-full rounded" disabled={isLoading}>
												{isEditing ? <TbEdit /> : <Plus />}
												{isEditing ? chrome.i18n.getMessage("edit_app", "Edit app") : chrome.i18n.getMessage("add_app", "Add app")}
											</Button>
										</form>
									</Form>
								</div>
							</DialogContent>
						</Dialog>
					</li>
				</ul>
			</SortableContext>
			<DragOverlay zIndex={50}>
				{draggingApp ? (
					<div className="size-17.5 bg-white dark:bg-slate-800 pt-1 rounded border border-primary shadow-lg p-2 flex flex-col items-center justify-between">
						<img src={draggingApp.icon} alt={draggingApp.title} className="size-6 rounded-xs" />
						<span className="text-slate-800 dark:text-slate-300 text-xs truncate max-w-14">{draggingApp.title}</span>
					</div>
				) : null}
			</DragOverlay>
		</DndContext>
	);
};

export default UserApps;
