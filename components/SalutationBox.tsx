import { dailySalutation } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface SalutationBoxProps {
	className?: string;
}

/**
 * Renders a salutation based on the time of day and a link to the next appointment
 * @param {Object} props Component props
 * @param {string} [props.classNames] Additional class names to add to the component
 * @returns {ReactElement} JSX element
 */
const SalutationBox = ({ className }: SalutationBoxProps) => {
	const salutation = dailySalutation();
	return (
		<div className={cn("flex justify-between", className)}>
			<h2 className="text-white text-4xl font-light dark:text-slate-100 text-shadow-lg">{salutation}</h2>
		</div>
	);
};

export default SalutationBox;
