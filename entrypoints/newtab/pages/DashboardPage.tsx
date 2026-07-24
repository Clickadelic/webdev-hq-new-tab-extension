import AppIcon from "@/components/global/AppIcon";
import BackgroundImage from "@/components/global/BackgroundImage";
import ButtonBar from "@/components/newtab/ButtonBar";
import CircularMenu from "@/components/global/CircularMenu";
import Clock from "@/components/newtab/Clock";

import UserInfoBox from "@/components/newtab/UserInfoBox";
import MultiSearch from "@/components/newtab/MultiSearch";
import TabsModule from "@/components/newtab/TabsModule";
// import EntrypointButton from "@/components/global/EntrypointButton"

import { ThemeProvider } from "@/components/global/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
const DashboardPage = () => {
	return (
		<>
			<div className="flex justify-between gap-1 p-1">
				<AppIcon url={import.meta.env.WXT_HOMEPAGE_URL} classNames="flex justify-center items-center size-[64px]" />
				<Clock classNames="text-white mt-2 font-light text-shadow-lg text-3xl space-x-2" />
			</div>
			<MultiSearch classNames="w-full max-w-[890px] my-3 mx-auto bg-white/30 p-1 rounded backdrop-blur dark:bg-neutral-800/30" />
			<TabsModule classNames="w-full max-w-[890px] mx-auto flex flex-row" />
		</>
	);
};

export default DashboardPage;
