import { useAppStore } from "@/stores/use-app-store";
import { useTodoStore } from "@/stores/use-todo-store";
const DashboardPage = () => {
	const apps = useAppStore();
	const todos = useTodoStore();
	return (
		<div className="grid grid-cols-4 gap-2">
			<div className="p-1 rounded bg-white/30 backdrop-blur dark:bg-slate-800/30">
				<div className="bg-white dark:bg-slate-800 p-3">Apps {apps.apps.length}</div>
			</div>
			<div className="p-1 rounded bg-white/30 backdrop-blur dark:bg-slate-800/30">
				<div className="bg-white dark:bg-slate-800 p-3">Todos {todos.todos.length}</div>
			</div>
			<div className="p-1 rounded bg-white/30 backdrop-blur dark:bg-slate-800/30">
				<div className="bg-white dark:bg-slate-800 p-3">Box</div>
			</div>
			<div className="p-1 rounded bg-white/30 backdrop-blur dark:bg-slate-800/30">
				<div className="bg-white dark:bg-slate-800 p-3">Box</div>
			</div>
		</div>
	);
};

export default DashboardPage;
