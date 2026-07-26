import iconSrc from "@/assets/icons/extension/icon-32.png"
import { cn } from "@/lib/utils"

interface AppIconProps {
	url: string
	classNames?: string
	target?: string | "_self"
}

const AppIcon = ({ url, classNames, target }: AppIconProps) => {
	return (
		<a href={`${url}`} className={cn("size-7 hover:opacity-70", classNames || "")} title="WebDev HQ" target={target} rel="noopener noreferrer">
			<img src={iconSrc} className="size-7" alt="WebDev HQ App-Icon" />
		</a>
	)
}

export default AppIcon
