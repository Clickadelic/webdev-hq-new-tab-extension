import { formatIsoDate } from "@/lib/utils";

interface DateDisplayProps {
	className?: string;
}

export default function DateDisplay({ className }: DateDisplayProps) {
	return (
		<div className={`bg-white/30 dark:bg-neutral-900/30 p-1 rounded backdrop-blur ${className || ''}`}>
			<div className="bg-white dark:bg-neutral-900 text-white font-light text-shadow-lg text-3xl">
				{formatIsoDate(new globalThis.Date())}
			</div>
		</div>
	);
}
