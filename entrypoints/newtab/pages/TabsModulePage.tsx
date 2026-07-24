import MultiSearch from "@/components/MultiSearch";
import TabsModule from "@/components/TabsModule";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const TabsModulePage = () => {
	return (
		<div className="flex flex-col gap-4">
			<div className="flex items-center gap-3">
				<Button asChild variant="ghost" size="sm">
					<Link to="/">← Back</Link>
				</Button>
				<h1 className="text-xl font-semibold text-white drop-shadow">Tabs</h1>
			</div>
			<MultiSearch classNames="w-full max-w-[890px] my-3 mx-auto bg-white/30 p-1 rounded backdrop-blur dark:bg-neutral-800/30" />
			<TabsModule classNames="w-full max-w-[890px] mx-auto flex flex-row" />
		</div>
	);
};

export default TabsModulePage;
