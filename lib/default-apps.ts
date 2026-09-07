// Updated Icons in 2026
import GmailIcon from "@/assets/icons/google-apps-2026/google-gmail-2026.svg";
import DriveIcon from "@/assets/icons/google-apps-2026/google-drive-2026.svg";
import CalendarIcon from "@/assets/icons/google-apps-2026/google-calendar-2026.svg";
import DocsIcon from "@/assets/icons/google-apps-2026/google-docs-2026.svg";
import SheetsIcon from "@/assets/icons/google-apps-2026/google-sheets-2026.svg";
import SlidesIcon from "@/assets/icons/google-apps-2026/google-slides-2026.svg";
import FormsIcon from "@/assets/icons/google-apps-2026/google-forms-2026.svg";
import MeetIcon from "@/assets/icons/google-apps-2026/google-meet-2026.svg";
import KeepIcon from "@/assets/icons/google-apps-2026/google-keep-2026.svg";
import TasksIcon from "@/assets/icons/google-apps-2026/google-tasks-2026.svg";
import MapsIcon from "@/assets/icons/google-apps-2026/google-maps-2026.svg";
import NewsIcon from "@/assets/icons/google-apps/google-news.svg";
import GsavedIcon from "@/assets/icons/google-apps-2026/google.svg";
import OneIcon from "@/assets/icons/google-apps-2026/google-one-2026.svg";
import VidsIcon from "@/assets/icons/google-apps-2026/google-vids-2026.svg";
import VoiceIcon from "@/assets/icons/google-apps-2026/google-voice-2026.svg";
import ChatIcon from "@/assets/icons/google-apps-2026/google-chat-2026.svg";
// Old icons
import AccountIcon from "@/assets/icons/google-apps/google-account.svg";
import PasswordsIcon from "@/assets/icons/google-apps/google-password.svg";
import ContactsIcon from "@/assets/icons/google-apps/google-contacts.svg";
import PhotosIcon from "@/assets/icons/google-apps/google-photos.svg";
import TranslateIcon from "@/assets/icons/google-apps/google-translate.svg";
import AlertsIcon from "@/assets/icons/google-apps/google-alerts.svg";
import AnalyticsIcon from "@/assets/icons/google-apps/google-analytics.svg";
import AdsIcon from "@/assets/icons/google-apps/google-ads.svg";
import LighthouseIcon from "@/assets/icons/google-apps/google-lighthouse.svg";
import FontsIcon from "@/assets/icons/google-apps/google-fonts.svg";
import WebDevIcon from "@/assets/icons/google-apps/google-webdev.svg";
import CloudIcon from "@/assets/icons/google-apps/google-cloud.svg";
import DevelopersIcon from "@/assets/icons/google-apps/google-developers.svg";
import DNSIcon from "@/assets/icons/google-apps/google-dns-tools.svg";
import ConsoleIcon from "@/assets/icons/google-apps/google-search-console.svg";
import WebStoreIcon from "@/assets/icons/google-apps/google-webstore.svg";
import YouTubeIcon from "@/assets/icons/google-apps/google-youtube.svg";
import GeminiIcon from "@/assets/icons/google-apps/google-gemini.svg";

const defaultApps = [
	{
		id: crypto.randomUUID(),
		title: "G-Mail",
		icon: GmailIcon,
		url: "https://mail.google.com"
	},
	{
		id: crypto.randomUUID(),
		title: "Drive",
		icon: DriveIcon,
		url: "https://drive.google.com"
	},
	{
		id: crypto.randomUUID(),
		title: "Account",
		icon: AccountIcon,
		url: "https://myaccount.google.com"
	},
	{
		id: crypto.randomUUID(),
		title: "Passwords",
		icon: PasswordsIcon,
		url: "https://passwords.google.com/?pli=1"
	},
	{
		id: crypto.randomUUID(),
		title: "Contacts",
		icon: ContactsIcon,
		url: "https://contacts.google.com"
	},
	{
		id: crypto.randomUUID(),
		title: "Docs",
		icon: DocsIcon,
		url: "https://docs.google.com"
	},
	{
		id: crypto.randomUUID(),
		title: "Sheets",
		icon: SheetsIcon,
		url: "https://docs.google.com/spreadsheets"
	},
	{
		id: crypto.randomUUID(),
		title: "Slides",
		icon: SlidesIcon,
		url: "https://docs.google.com/presentation/u/0/?ec=wgc-slides-[module]-goto"
	},
	{
		id: crypto.randomUUID(),
		title: "Forms",
		icon: FormsIcon,
		url: "https://docs.google.com/forms/u/0/"
	},
	{
		id: crypto.randomUUID(),
		title: "Meet",
		icon: MeetIcon,
		url: "https://meet.google.com"
	},
	{
		id: crypto.randomUUID(),
		title: "Calendar",
		icon: CalendarIcon,
		url: "https://www.google.com/calendar"
	},
	{
		id: crypto.randomUUID(),
		title: "Maps",
		icon: MapsIcon,
		url: "https://www.google.com/maps"
	},
	{
		id: crypto.randomUUID(),
		title: "News",
		icon: NewsIcon,
		url: "https://news.google.com/"
	},
	{
		id: crypto.randomUUID(),
		title: "Photos",
		icon: PhotosIcon,
		url: "https://www.google.com/photos/about/"
	},
	{
		id: crypto.randomUUID(),
		title: "Tasks",
		icon: TasksIcon,
		url: "https://tasks.google.com"
	},
	{
		id: crypto.randomUUID(),
		title: "Translate",
		icon: TranslateIcon,
		url: "https://translate.google.com"
	},
	{
		id: crypto.randomUUID(),
		title: "Alerts",
		icon: AlertsIcon,
		url: "https://alerts.google.com"
	},
	{
		id: crypto.randomUUID(),
		title: "Keep",
		icon: KeepIcon,
		url: "https://keep.google.com/"
	},
	{
		id: crypto.randomUUID(),
		title: "G-Saved",
		icon: GsavedIcon,
		url: "https://www.google.com/interests/saved"
	},
	{
		id: crypto.randomUUID(),
		title: "Analytics",
		icon: AnalyticsIcon,
		url: "https://developers.google.com/analytics"
	},
	{
		id: crypto.randomUUID(),
		title: "Ads",
		icon: AdsIcon,
		url: "https://ads.google.com/"
	},
	{
		id: crypto.randomUUID(),
		title: "Lighthouse",
		icon: LighthouseIcon,
		url: "https://pagespeed.web.dev/"
	},
	{
		id: crypto.randomUUID(),
		title: "Fonts",
		icon: FontsIcon,
		url: "https://fonts.google.com"
	},
	{
		id: crypto.randomUUID(),
		title: "Web.Dev",
		icon: WebDevIcon,
		url: "https://web.dev/"
	},
	{
		id: crypto.randomUUID(),
		title: "Cloud",
		icon: CloudIcon,
		url: "https://cloud.google.com"
	},
	{
		id: crypto.randomUUID(),
		title: "Developers",
		icon: DevelopersIcon,
		url: "https://developers.google.com"
	},
	{
		id: crypto.randomUUID(),
		title: "DNS",
		icon: DNSIcon,
		url: "https://toolbox.googleapps.com/apps/dig/"
	},
	{
		id: crypto.randomUUID(),
		title: "Console",
		icon: ConsoleIcon,
		url: "https://search.google.com/search-console"
	},
	{
		id: crypto.randomUUID(),
		title: "WebStore",
		icon: WebStoreIcon,
		url: "https://chromewebstore.google.com/"
	},
	{
		id: crypto.randomUUID(),
		title: "Gemini",
		icon: GeminiIcon,
		url: "https://gemini.google.com/"
	},
	{
		id: crypto.randomUUID(),
		title: "One",
		icon: OneIcon,
		url: "https://one.google.com/"
	},
	{
		id: crypto.randomUUID(),
		title: "Vids",
		icon: VidsIcon,
		url: "https://www.youtube.com/feed/library"
	},
	{
		id: crypto.randomUUID(),
		title: "Voice",
		icon: VoiceIcon,
		url: "https://voice.google.com/"
	},
	{
		id: crypto.randomUUID(),
		title: "Chat",
		icon: ChatIcon,
		url: "https://chat.google.com"
	},
	{
		id: crypto.randomUUID(),
		title: "YouTube",
		icon: YouTubeIcon,
		url: "https://youtube.com"
	}
];

export default defaultApps;
