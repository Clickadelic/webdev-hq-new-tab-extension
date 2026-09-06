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

const App = () => {
	return (
		<ThemeProvider>
			<BackgroundImage classNames="relative min-h-screen bg-neutral-100 dark:bg-neutral-900">
				<div className="flex justify-between gap-1 p-1">
					<AppIcon url={import.meta.env.WXT_HOMEPAGE_URL} classNames="flex justify-center items-center size-[64px]" />
					<Clock classNames="text-white mt-2 font-light text-shadow-lg text-3xl space-x-2" />
					<h2>Username</h2>
				</div>
				<UserInfoBox classNames="w-full max-w-[1100px] mt-12 mx-auto md:mt-20 xl:mt-24 mb-3 flex justify-between gap-1 p-1 pr-4" />
				<MultiSearch classNames="w-full max-w-[1100px] my-3 mx-auto bg-white/30 p-1 rounded backdrop-blur dark:bg-neutral-800/30" />
				<TabsModule classNames="w-full max-w-[1100px] mx-auto flex flex-row" />
				<ButtonBar classNames="w-[227px] absolute bottom-3 left-24 right-24 p-1 mx-auto flex items-center justify-center bg-white/30 dark:bg-neutral-800/30 rounded backdrop-blur" />
				{/* <HardwareGrid className="w-96 absolute bottom-24 left-4 p-1 mx-auto flex items-center justify-center bg-white/30 dark:bg-neutral-800/30 rounded backdrop-blur" /> */}
				<CircularMenu />
				<Toaster className="dark:bg-neutral-800" />
			</BackgroundImage>
		</ThemeProvider>
	);
};

export default App;
