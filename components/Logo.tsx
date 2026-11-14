import logoIconUrl from "@/assets/icons/extension/icon-32.png";
import { cn } from "@/lib/utils";

interface LogoProps {
	wrapperClasses?: string;
	headingClasses?: string;
	linkClasses?: string;
	imgClasses?: string;
	isSidebarOpen?: boolean;
	url?: string;
}

const Logo = ({ wrapperClasses, headingClasses, linkClasses, imgClasses, isSidebarOpen, url }: LogoProps) => {
	return (
		<div className={cn("w-full flex h-15", wrapperClasses)}>
			<h1 className={cn("w-full flex text-2xl", headingClasses)}>
				<a href={url} className={cn("w-full flex justify-center items-center", linkClasses)} target="_blank" rel="noopener noreferrer">
					<img src={logoIconUrl} className={cn("size-7 mt-.5", imgClasses)} alt="WebDev HQ Logo" />
					<span
						className={cn("overflow-hidden whitespace-nowrap font-light transition-all duration-200 ease-linear", isSidebarOpen ? "ml-2 max-w-40 opacity-100" : "ml-0 max-w-0 opacity-0")}
					>
						<span className="web">Web</span>
						<span className="dev-hq font-medium">Dev HQ</span>
					</span>
				</a>
			</h1>
		</div>
	);
};

export default Logo;
