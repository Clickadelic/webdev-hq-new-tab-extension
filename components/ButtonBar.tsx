import { SettingsButton } from "@/components/SettingsButton_old";
import { ModeToggle } from "@/components/ModeToggle";

import { cn } from "@/lib/utils";

interface ButtonBarProps {
	classNames?: string;
}

const ButtonBar = ({ classNames }: ButtonBarProps) => {
	return (
		<div className={cn(classNames)}>
			<div className="w-full flex justify-start gap-1">
				<ModeToggle />
				<SettingsButton />
			</div>
		</div>
	);
};

export default ButtonBar;
