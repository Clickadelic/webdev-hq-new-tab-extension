import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface ClockProps {
	classNames?: string
	digitStyle?: string
}

/**
 * A user-visible clock that updates every minute.
 *
 * @param classNames Classes to apply to the outermost element.
 * @param digitStyle Classes to apply to each digit's span element.
 */

const Clock: React.FC<ClockProps> = ({ classNames, digitStyle }: ClockProps) => {
	const [time, setTime] = useState<string>("")

	const oClockLabel = chrome.i18n.getMessage("o_clock", "o' clock")
	useEffect(() => {
		const updateClock = () => {
			const now = new Date()
			const formatter = new Intl.DateTimeFormat(navigator.language, {
				hour: "numeric",
				minute: "2-digit"
			})
			setTime(formatter.format(now))
		}

		updateClock() // Initial load
		const interval = setInterval(updateClock, 1000) // Update every second

		return () => clearInterval(interval)
	}, [])

	return (
		<div className={cn("flex", classNames)}>
			<span className={cn("flex", digitStyle)}>{time}</span>
			<span className={cn("flex", digitStyle)}>{oClockLabel}</span>
		</div>
	)
}

export default Clock
