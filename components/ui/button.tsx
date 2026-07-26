import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
	"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded text-sm font-medium transition-all hover:cursor-pointer disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
	{
		variants: {
			variant: {
				primary: "bg-primary text-primary-foreground dark:text-slate-300 hover:bg-primary-hover",
				default: "bg-primary text-primary-foreground dark:bg-slate-800 hover:bg-primary-hover",
				blank: "bg-transparent text-white dark:bg-transparent hover:bg-primary-hover/30 dark:hover:bg-primary-hover/30",
				destructive: "bg-destructive text-white bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
				outline: "border bg-background bg-accent dark:bg-slate-800 hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
				secondary: "bg-secondary text-secondary-foreground dark:bg-slate-800 hover:bg-secondary/80",
				ghost: "rounded dark:bg-slate-800 hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
				link: "text-primary underline-offset-4 dark:bg-slate-800 hover:underline",
				subtle: "bg-transparent text-slate-800 dark:bg-slate-800 hover:bg-slate-200 hover:text-accent-foreground dark:bg-input/30 dark:hover:bg-input/50",
				delete: "text-slate-400 dark:bg-slate-800 hover:bg-destructive hover:text-white",
				calendar: "text-slate-200 focus:text-slate-200 hover:text-slate-200 dark:bg-slate-800 hover:bg-slate-800"
			},
			size: {
				default: "h-9 px-4 py-2 has-[>svg]:px-3",
				sm: "h-8 rounded gap-1.5 px-3 has-[>svg]:px-2.5",
				lg: "h-10 rounded px-6 has-[>svg]:px-4",
				icon: "size-9"
			}
		},
		defaultVariants: {
			variant: "default",
			size: "default"
		}
	}
);

function Button({
	className,
	variant,
	size,
	asChild = false,
	...props
}: React.ComponentProps<"button"> &
	VariantProps<typeof buttonVariants> & {
		asChild?: boolean;
	}) {
	const Comp = asChild ? Slot : "button";

	return <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

export { Button, buttonVariants };
