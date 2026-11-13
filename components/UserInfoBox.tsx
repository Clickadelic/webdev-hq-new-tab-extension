import { dailySalutation } from "@/lib/utils"
import { cn } from "@/lib/utils"

// import NextAppointment from "./NextAppointment"

interface UserInfoBoxProps {
	classNames?: string
}

/**
 * Renders a salutation based on the time of day and a link to the next appointment
 * @param {Object} props Component props
 * @param {string} [props.classNames] Additional class names to add to the component
 * @returns {ReactElement} JSX element
 */
const UserInfoBox = ({ classNames }: UserInfoBoxProps) => {
	const salutation = dailySalutation()
	return (
		<div className={cn("flex justify-between", classNames)}>
			<h2 className="text-white text-4xl font-light dark:text-slate-100 text-shadow-lg">{salutation}</h2>
		</div>
	)
}

export default UserInfoBox
