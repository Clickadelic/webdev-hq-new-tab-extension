import { useAppStore } from "@/stores/use-app-store";
import { useTodoStore } from "@/stores/use-todo-store";
import { useProjectStore } from "@/stores/use-project-store";
const DashboardPage = () => {
	const apps = useAppStore();
	const todos = useTodoStore();
	const projects = useProjectStore();
	return (
		<div className="grid grid-cols-8 gap-2">
			<div className="col-span-2 p-1 rounded bg-white/30 backdrop-blur dark:bg-slate-800/30">
				<div className="bg-white dark:bg-slate-800 p-3 rounded flex flex-col">
					<span className="text-lg">Total Apps</span>
					<span>{apps.apps.length}</span>
				</div>
			</div>
			<div className="col-span-2 p-1 rounded bg-white/30 backdrop-blur dark:bg-slate-800/30">
				<div className="bg-white dark:bg-slate-800 p-3 rounded flex flex-col">
					<span className="text-lg">Total Todos</span>
					<span>{todos.todos.length}</span>
				</div>
			</div>
			<div className="col-span-2 p-1 rounded bg-white/30 backdrop-blur dark:bg-slate-800/30">
				<div className="bg-white dark:bg-slate-800 p-3 rounded flex flex-col">
					<span className="text-lg">Total Projects</span>
					<span>{projects.projects.length}</span>
				</div>
			</div>
			<div className="col-span-2 p-1 rounded bg-white/30 backdrop-blur dark:bg-slate-800/30">
				<div className="bg-white dark:bg-slate-800 p-3 rounded flex flex-col">
					<span className="text-lg">Total Apps</span>
					<span>{apps.apps.length}</span>
				</div>
			</div>
			<div className="col-span-5 p-1 rounded bg-white/30 backdrop-blur dark:bg-slate-800/30">
				<div className="bg-white dark:bg-slate-800 p-3 rounded flex flex-col">
					<span className="text-lg">Hyperlinks</span>
					<span>Table</span>
				</div>
			</div>
			<div className="col-span-3 p-1 rounded bg-white/30 backdrop-blur dark:bg-slate-800/30">
				<div className="bg-white dark:bg-slate-800 p-3 rounded flex flex-col">
					<span className="text-lg">News</span>
					<span>{apps.apps.length}</span>
				</div>
			</div>
		</div>
	);
};

export default DashboardPage;
