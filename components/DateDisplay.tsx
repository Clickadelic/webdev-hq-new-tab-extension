import { formatIsoDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface DateDisplayProps {
	className?: string;
}

export default function DateDisplay({ className }: DateDisplayProps) {
	return <div className={cn("text-white font-light text-shadow-lg text-3xl mt-2", className)}>{formatIsoDate(new globalThis.Date())}</div>;
}
