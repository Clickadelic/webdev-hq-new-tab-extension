import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";

function Switch({ className, ...props }: React.ComponentProps<typeof SwitchPrimitive.Root>) {
	return (
		<SwitchPrimitive.Root
			data-slot="switch"
			className={cn(
				"peer data-[state=checked]:bg-emerald-300 dark:data-[state=checked]:bg-emerald-300 data-[state=unchecked]:bg-neutral-200 focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-neutral-200 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
				className
			)}
			{...props}
		>
			<SwitchPrimitive.Thumb
				data-slot="switch-thumb"
				className={cn(
					"bg-neutral-500 data-[state=unchecked]:bg-neutral-400 dark:data-[state=unchecked]:bg-neutral-600 block size-4 rounded-full ring-0 transition-transform data-[state=checked]:tranneutral-x-[calc(100%-2px)] data-[state=unchecked]:tranneutral-x-0 hover:cursor-pointer"
				)}
			/>
		</SwitchPrimitive.Root>
	);
}

export { Switch };
