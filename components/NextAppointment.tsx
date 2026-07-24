import { useEffect, useState } from "react"
import { formatIsoDate } from "@/lib/utils"
export default function NextAppointment() {
	const [event, setEvent] = useState<any>(null)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		chrome.runtime.sendMessage({ action: "getNextCalendarEvent" }, res => {
			if (res?.error) {
				setError(res.error)
			} else {
				setEvent(res.event)
			}
		})
	}, [])

	return (
		<>
			{error && <p className="mt-3.5 text-rose-400 dark:text-rose-400 text-lg font-light text-shadow-lg">{error}</p>}
			{event ? (
				<p className="text-white text-lg font-light mt-3.5 dark:text-slate-100 text-shadow-lg">
					{chrome.i18n.getMessage("next_appointment", "Next appointment")}: {event.summary} –{" "}
					<a href={event.htmlLink} className="hover:underline" target="_self" title={event.summary}>
						{formatIsoDate(event.start.dateTime)}
					</a>
				</p>
			) : (
				<p className="text-white text-lg font-light mt-3.5 dark:text-slate-100 text-shadow-lg">{chrome.i18n.getMessage("no_appointment_found", "No appointment found")}</p>
			)}
		</>
	)
}
