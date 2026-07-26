import { Link } from "react-router-dom";
import EntrypointButton from "@/components/temp-unneeded/EntrypointButton";
import { Button } from "@/components/ui/button";

const DashboardPage = () => {
	return (
		<div className="flex flex-col gap-4 p-4">
			<h1 className="text-2xl font-semibold text-white drop-shadow">Dashboard</h1>

			<div className="flex flex-wrap gap-3">
				{/* In-app navigation — uses React Router, stays within the newtab page */}
				<Button asChild variant="secondary">
					<Link to="/tabs">Tabs</Link>
				</Button>

				{/* External entrypoints — opens a new browser tab */}
				<EntrypointButton path="get-started.html" translationLabel="GetStarted" />
				<EntrypointButton path="options.html" translationLabel="Options" />
			</div>
		</div>
	);
};

export default DashboardPage;
