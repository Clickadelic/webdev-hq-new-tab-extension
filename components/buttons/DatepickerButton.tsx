import * as React from "react"
import { format } from "date-fns"
import { enUS, de, fr, es } from "date-fns/locale"
import { Calendar as CalendarIcon } from "lucide-react"
import { Locale } from "date-fns"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

const localeMap: Record<string, Locale> = {
	en: enUS,
	de: de,
	fr: fr,
	es: es
}

function getLocale(): Locale {
	const lang = chrome?.i18n?.getUILanguage?.() || navigator.language || "en"
	const shortLang = lang.split("-")[0]
	return localeMap[shortLang] || enUS
}

export function DatePickerButton() {
	const [date, setDate] = React.useState<Date>()
	const locale = getLocale()

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant="calendar" className={cn("w-[145px] justify-start text-left font-normal", !date && "text-muted-foreground")}>
					<CalendarIcon className="mr-1.5 h-4 w-4" />
					{date ? format(date, "PPP", { locale }) : <span>{chrome.i18n.getMessage("select_date", "Expiry date")}</span>}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0">
				<Calendar
					mode="single"
					selected={date}
					defaultMonth={date}
					onSelect={setDate}
					initialFocus
					locale={locale} // 👈 WICHTIG: Locale an den Kalender übergeben
				/>
			</PopoverContent>
		</Popover>
	)
}
