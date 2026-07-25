import MultiSearch from "@/components/MultiSearch";
import TabsModule from "@/components/TabsModule";

const TabsModulePage = () => {
	return (
		<div className="flex flex-col gap-4">
			<MultiSearch classNames="w-full my-3 mx-auto bg-white/30 p-1 rounded backdrop-blur dark:bg-neutral-800/30" />
			<TabsModule classNames="w-full mx-auto flex flex-row" />
		</div>
	);
};

export default TabsModulePage;
