import { SettingsButton } from "@/components/newtab/buttons/SettingsButton";
import { ModeToggle } from "@/components/ModeToggle";
import { FullscreenButton } from "@/components/newtab/buttons/FullscreenButton";

import { DashboardButton } from "@/components/newtab/buttons/DashboardButton";

import { cn } from "@/lib/utils";

interface ButtonBarProps {
	classNames?: string;
}

const ButtonBar = ({ classNames }: ButtonBarProps) => {
	return (
		<div className={cn(classNames)}>
			<div className="w-full flex justify-start gap-1">
				<DashboardButton />
				<FullscreenButton />
				<ModeToggle />
				<SettingsButton />
			</div>
		</div>
	);
};

export default ButtonBar;
