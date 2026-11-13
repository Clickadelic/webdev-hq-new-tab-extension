import AppIcon from "@/components/AppIcon";
import Date from "@/components/Date";
import BackgroundImage from "@/components/BackgroundImage";

import Clock from "@/components/Clock";
import UserInfoBox from "@/components/UserInfoBox";
import MultiSearch from "@/components/MultiSearch";

import SettingsButton from "@/components/SettingsButton";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import UserApps from "@/components/UserApps";

const App = () => {
	return (
		<ThemeProvider>
			<BackgroundImage classNames="relative min-h-screen bg-neutral-100 dark:bg-neutral-900">
				<div className="flex justify-between gap-1 p-1">
					<AppIcon url={import.meta.env.WXT_HOMEPAGE_URL} classNames="flex justify-center items-center size-[64px]" />
					<Clock classNames="text-white mt-2 font-light text-shadow-lg text-3xl space-x-2" />
					<Date className="mt-3 mr-3" />
				</div>
				<UserInfoBox classNames="w-full max-w-275 mt-12 mx-auto md:mt-20 xl:mt-24 mb-3 flex justify-between gap-1 p-1 pr-4" />
				<MultiSearch classNames="w-full max-w-275 my-3 mx-auto bg-white/30 p-1 rounded backdrop-blur dark:bg-neutral-900/30" />
				<UserApps className="w-full max-w-275 mx-auto" />
				<SettingsButton className="fixed bottom-8 right-8" />
				<Toaster className="dark:bg-neutral-900" />
			</BackgroundImage>
		</ThemeProvider>
	);
};

export default App;
