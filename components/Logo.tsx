import logoIconUrl from "@/assets/icons/extension/icon-32.png";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/components/ui/sidebar";
import { useEffect, useState } from "react";

interface LogoProps {
	wrapperClasses?: string;
	headingClasses?: string;
	linkClasses?: string;
	imgClasses?: string;
	url?: string;
}

const Logo = ({ wrapperClasses, headingClasses, linkClasses, imgClasses, url }: LogoProps) => {
	const { open } = useSidebar();
	const [showWordmark, setShowWordmark] = useState(open);

	useEffect(() => {
		if (!open) {
			setShowWordmark(false);
			return;
		}

		const timeoutId = window.setTimeout(() => setShowWordmark(true), 180);
		return () => window.clearTimeout(timeoutId);
	}, [open]);

	return (
		<div className={cn("w-full flex h-15", wrapperClasses)}>
			<h1 className={cn("w-full flex text-2xl", headingClasses)}>
				<a href={url} className={cn("w-full gap-2 flex justify-center items-center", linkClasses)} target="_blank" rel="noopener noreferrer">
					<img src={logoIconUrl} className={cn("size-7 mt-.5", imgClasses)} alt="WebDev HQ Logo" />
					{showWordmark ? (
						<span className={cn("font-light whitespace-nowrap")}>
							<span className="web">Web</span>
							<span className="dev-hq font-medium">Dev HQ</span>
						</span>
					) : null}
				</a>
			</h1>
		</div>
	);
};

export default Logo;
