import accountIcon from "@/assets/icons/google-apps/google-account.svg"
import adsIcon from "@/assets/icons/google-apps/google-ads.svg"
import alertsIcon from "@/assets/icons/google-apps/google-alerts.svg"
import analyticsIcon from "@/assets/icons/google-apps/google-analytics.svg"
import calendarIcon from "@/assets/icons/google-apps/google-calendar.svg"
import keepIcon from "@/assets/icons/google-apps/google-keep.svg"
import meetIcon from "@/assets/icons/google-apps/google-meet.svg"
import lighthouseIcon from "@/assets/icons/google-apps/google-lighthouse.svg"
import cloudIcon from "@/assets/icons/google-apps/google-cloud.svg"
import contactsIcon from "@/assets/icons/google-apps/google-contacts.svg"
import developersIcon from "@/assets/icons/google-apps/google-developers.svg"
import dnsToolsIcon from "@/assets/icons/google-apps/google-dns-tools.svg"
import docsIcon from "@/assets/icons/google-apps/google-docs.svg"
import driveIcon from "@/assets/icons/google-apps/google-drive.svg"
import gMailIcon from "@/assets/icons/google-apps/google-gmail.svg"
import sheetsIcon from "@/assets/icons/google-apps/google-sheets.svg"
import mapsIcon from "@/assets/icons/google-apps/google-maps.svg"
import searchIcon from "@/assets/icons/google-apps/google-logo.svg"
import passwordsIcon from "@/assets/icons/google-apps/google-password.svg"
import searchConsoleIcon from "@/assets/icons/google-apps/google-search-console.svg"
import slidesIcon from "@/assets/icons/google-apps/google-slides.svg"
import translateIcon from "@/assets/icons/google-apps/google-translate.svg"
import tasksIcon from "@/assets/icons/google-apps/google-tasks.svg"
import fontsIcon from "@/assets/icons/google-apps/google-fonts.svg"
import geminiIcon from "@/assets/icons/google-apps/google-gemini.svg"
import formsIcon from "@/assets/icons/google-apps/google-forms.svg"
import photosIcon from "@/assets/icons/google-apps/google-photos.svg"
import newsIcon from "@/assets/icons/google-apps/google-news.svg"
import webstoreIcon from "@/assets/icons/google-apps/google-chrome-web-store.svg"
import youTubeIcon from "@/assets/icons/video-platforms/youtube-color-icon.svg"
import webdevIcon from "@/assets/icons/google-apps/google-webdev.svg"

const defaultApps = [
	{
		id: crypto.randomUUID(),
		title: "G-Mail",
		icon: gMailIcon,
		url: "https://mail.google.com"
	},
	{
		id: crypto.randomUUID(),
		title: "Drive",
		icon: driveIcon,
		url: "https://drive.google.com"
	},
	{
		id: crypto.randomUUID(),
		title: "Account",
		icon: accountIcon,
		url: "https://myaccount.google.com"
	},
	{
		id: crypto.randomUUID(),
		title: "Passwords",
		icon: passwordsIcon,
		url: "https://passwords.google.com/?pli=1"
	},
	{
		id: crypto.randomUUID(),
		title: "Contacts",
		icon: contactsIcon,
		url: "https://contacts.google.com"
	},
	{
		id: crypto.randomUUID(),
		title: "Docs",
		icon: docsIcon,
		url: "https://docs.google.com"
	},
	{
		id: crypto.randomUUID(),
		title: "Sheets",
		icon: sheetsIcon,
		url: "https://docs.google.com/spreadsheets"
	},
	{
		id: crypto.randomUUID(),
		title: "Slides",
		icon: slidesIcon,
		url: "https://docs.google.com/presentation/u/0/?ec=wgc-slides-[module]-goto"
	},
	{
		id: crypto.randomUUID(),
		title: "Forms",
		icon: formsIcon,
		url: "https://docs.google.com/forms/u/0/"
	},
	{
		id: crypto.randomUUID(),
		title: "Meet",
		icon: meetIcon,
		url: "https://meet.google.com"
	},
	{
		id: crypto.randomUUID(),
		title: "Calendar",
		icon: calendarIcon,
		url: "https://www.google.com/calendar"
	},
	{
		id: crypto.randomUUID(),
		title: "Maps",
		icon: mapsIcon,
		url: "https://www.google.com/maps"
	},
	{
		id: crypto.randomUUID(),
		title: "News",
		icon: newsIcon,
		url: "https://news.google.com/"
	},
	{
		id: crypto.randomUUID(),
		title: "Photos",
		icon: photosIcon,
		url: "https://www.google.com/photos/about/"
	},
	{
		id: crypto.randomUUID(),
		title: "Tasks",
		icon: tasksIcon,
		url: "https://tasks.google.com"
	},
	{
		id: crypto.randomUUID(),
		title: "Translate",
		icon: translateIcon,
		url: "https://translate.google.com"
	},
	{
		id: crypto.randomUUID(),
		title: "Alerts",
		icon: alertsIcon,
		url: "https://alerts.google.com"
	},
	{
		id: crypto.randomUUID(),
		title: "Keep",
		icon: keepIcon,
		url: "https://keep.google.com/"
	},
	{
		id: crypto.randomUUID(),
		title: "G-Saved",
		icon: searchIcon,
		url: "https://www.google.com/interests/saved"
	},
	{
		id: crypto.randomUUID(),
		title: "Analytics",
		icon: analyticsIcon,
		url: "https://developers.google.com/analytics"
	},
	{
		id: crypto.randomUUID(),
		title: "Ads",
		icon: adsIcon,
		url: "https://ads.google.com/"
	},
	{
		id: crypto.randomUUID(),
		title: "Lighthouse",
		icon: lighthouseIcon,
		url: "https://pagespeed.web.dev/"
	},
	{
		id: crypto.randomUUID(),
		title: "Fonts",
		icon: fontsIcon,
		url: "https://fonts.google.com"
	},
	{
		id: crypto.randomUUID(),
		title: "Web.Dev",
		icon: webdevIcon,
		url: "https://web.dev/"
	},
	{
		id: crypto.randomUUID(),
		title: "Cloud",
		icon: cloudIcon,
		url: "https://cloud.google.com"
	},
	{
		id: crypto.randomUUID(),
		title: "Developers",
		icon: developersIcon,
		url: "https://developers.google.com"
	},
	{
		id: crypto.randomUUID(),
		title: "DNS",
		icon: dnsToolsIcon,
		url: "https://toolbox.googleapps.com/apps/dig/"
	},
	{
		id: crypto.randomUUID(),
		title: "Console",
		icon: searchConsoleIcon,
		url: "https://search.google.com/search-console"
	},
	{
		id: crypto.randomUUID(),
		title: "WebStore",
		icon: webstoreIcon,
		url: "https://chromewebstore.google.com/"
	},
	{
		id: crypto.randomUUID(),
		title: "YouTube",
		icon: youTubeIcon,
		url: "https://youtube.com"
	},
	{
		id: crypto.randomUUID(),
		title: "Gemini",
		icon: geminiIcon,
		url: "https://gemini.google.com/"
	}
]

export default defaultApps
