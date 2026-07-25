import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

import { FormError } from "@/components/forms/form-error";
import { FormSuccess } from "@/components/forms/form-success";
import { Switch } from "@/components/ui/switch";

import { Plus } from "lucide-react";
import { BsTrash3 } from "react-icons/bs";
import { cn } from "@/lib/utils";
import { FaArrowUpRightDots } from "react-icons/fa6";
import { useTodoStore } from "@/stores/use-todo-store";
import { TodoSchema } from "@/schemas";
import { useState, useRef } from "react";
import { TbEdit } from "react-icons/tb";
import { BsListCheck } from "react-icons/bs";
import { DatePickerButton } from "@/components/DatepickerButton";

const UserTodos = () => {
	const { todos, addTodo, toggleTodo, deleteTodo } = useTodoStore();

	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const [editingTodoId, setEditingTodoId] = useState<string | null>(null);
	const [error, setError] = useState<string | undefined>(undefined);
	const [success, setSuccess] = useState<string | undefined>(undefined);
	const submittedByKeyRef = useRef(false);

	const form = useForm<z.infer<typeof TodoSchema>>({
		resolver: zodResolver(TodoSchema),
		defaultValues: { title: "", description: "", done: false }
	});

	const onAddSubmit = (values: z.infer<typeof TodoSchema>) => {
		setError("");
		setSuccess("");
		addTodo(values.title);
		form.reset();
		toast.success(chrome.i18n.getMessage("todo_added", "Todo added."));
	};

	const onEdit = (id: string) => {
		setIsEditing(true);
		setEditingTodoId(id);
		const todo = todos.find(todo => todo.id === id);
		if (todo) {
			form.setValue("title", todo.title);
			form.setValue("description", todo.description);
			form.setValue("done", todo.done);
		}
	};

	const onEditSubmit = (values: z.infer<typeof TodoSchema>) => {
		if (!editingTodoId) return;

		setError("");
		setSuccess("");

		const currentTodo = todos.find(todo => todo.id === editingTodoId);

		if (currentTodo) {
			currentTodo.title = values.title;
			currentTodo.description = values.description;
			currentTodo.done = values.done;
			setSuccess(chrome.i18n.getMessage("todo_updated", "Todo updated successfully."));
		}

		setSuccess(chrome.i18n.getMessage("todo_updated", "Todo updated successfully."));
		form.reset();
		setEditingTodoId(null);
		setIsEditing(false);
		toast.success(chrome.i18n.getMessage("todo_edited", "Todo edited."));
	};

	const onDelete = (id: string) => {
		deleteTodo(id);
		toast.success(chrome.i18n.getMessage("todo_deleted", "Todo deleted."));
	};

	return (
		<div className="flex flex-col bg-white/30 dark:bg-slate-800/30 backdrop-blur p-1 space-y-1 rounded">
			<div className="bg-white  dark:bg-slate-800 rounded p-1 backdrop-blur">
				<Form {...form}>
					<form
						onSubmit={e => {
							e.preventDefault();
							if (submittedByKeyRef.current) {
								submittedByKeyRef.current = false;
								return;
							}
							form.handleSubmit(onAddSubmit)(e);
						}}
						className="flex flex-row w-full gap-1"
					>
						<div className="flex flex-row w-full gap-1">
							<FormField
								control={form.control}
								name="title"
								render={({ field }) => (
									<FormItem className="w-full flex flex-col">
										<FormLabel className="hidden">{chrome.i18n.getMessage("new_todo_title", "Title")}:</FormLabel>
										<FormControl>
											<Input
												type="text"
												className="border-0 shadow-none"
												disabled={isLoading}
												placeholder={chrome.i18n.getMessage("new_todo_placeholder", "New todo")}
												{...field}
												onKeyDown={e => {
													if (e.key === "Enter") {
														e.preventDefault();
														submittedByKeyRef.current = true;
														const title = e.currentTarget.value.trim();
														if (title) {
															addTodo(title);
															form.reset();
															toast.success(chrome.i18n.getMessage("todo_added", "Todo added."));
														}
													}
												}}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<DatePickerButton />
							<Button
								type="submit"
								className="bg-primary hover:bg-primary-hover text-white dark:bg-primary dark:hover:bg-primary-hover dark:text-slate-200 rounded py-2 px-3 hover:cursor-pointer"
								disabled={isLoading}
							>
								{isEditing ? <TbEdit /> : <Plus />}
							</Button>
						</div>
						{error && <FormError message={error} />}
						{success && <FormSuccess message={success} />}
					</form>
				</Form>
			</div>
			<ul className="w-full flex flex-col space-y-1 bg-white dark:bg-slate-800 rounded p-1 backdrop-blur">
				{todos.length === 0 && (
					<p className="text-center text-md bg-white dark:bg-slate-800 rounded text-slate-500 dark:text-slate-300 my-2">
						{chrome.i18n.getMessage("create_your_first_todo", "Create your first todo.")}
					</p>
				)}
				{todos.map(todo => (
					<li key={todo.id} className="flex justify-start items-start p-.5 hover:text-slate-500 dark:text-slate-300 space-x-1">
						<div className="w-full flex justify-start hover:bg-gray-100 dark:hover:bg-slate-700 rounded">
							<Input type="checkbox" name={todo.id} checked={todo.done} onChange={() => toggleTodo(todo.id)} className="mt-2 mx-2 size-4 hover:cursor-pointer " />
							<span className={cn("w-full grow my-2 ", todo.done && "line-through text-slate-500 dark:text-slate-300")}>{todo.title}</span>
						</div>
						<Button type="button" variant="ghost" className="text-slate-400" size="sm" onClick={() => onEdit(todo.id)}>
							<TbEdit className="size-4" />
						</Button>
						<Button type="button" variant="ghost" size="sm" className="text-slate-400 hover:text-rose-400" onClick={() => onDelete(todo.id)}>
							<BsTrash3 className="size-4" />
						</Button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default UserTodos;
