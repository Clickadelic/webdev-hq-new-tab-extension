import { formatIsoDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface TheDateProps {
	className?: string;
}

export default function TheDate({ className }: TheDateProps) {
	return (
		<div className="bg-white/30 dark:bg-neutral-900/30 p-1 rounded backdrop-blur">
			<div className={"bg-white dark:bg-neutral-900 text-white font-light text-shadow-lg text-3xl"}>{formatIsoDate(new Date())}</div>
		</div>
	);
}
