import AppIcon from "@/components/AppIcon";
import { formatIsoDate } from "@/lib/utils";
import BackgroundImage from "@/components/BackgroundImage";
import ButtonBar from "@/components/ButtonBar";
import Clock from "@/components/Clock";
import UserInfoBox from "@/components/UserInfoBox";
import MultiSearch from "@/components/MultiSearch";

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
					<div className="text-white mt-2 font-light text-shadow-lg text-3xl space-x-2 mr-3">{formatIsoDate(new Date())}</div>
				</div>
				<UserInfoBox classNames="w-full max-w-275 mt-12 mx-auto md:mt-20 xl:mt-24 mb-3 flex justify-between gap-1 p-1 pr-4" />
				<MultiSearch classNames="w-full max-w-275 my-3 mx-auto bg-white/30 p-1 rounded backdrop-blur dark:bg-neutral-800/30" />
				<UserApps className="w-full max-w-275 mx-auto" />

				<ButtonBar classNames="w-[227px] absolute bottom-3 left-24 right-24 p-1 mx-auto flex items-center justify-center bg-white/30 dark:bg-neutral-800/30 rounded backdrop-blur" />
				<Toaster className="dark:bg-neutral-800" />
			</BackgroundImage>
		</ThemeProvider>
	);
};

export default App;
