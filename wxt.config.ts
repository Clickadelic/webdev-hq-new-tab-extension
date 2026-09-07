import { defineConfig } from "wxt";
import tailwindcss from "@tailwindcss/vite";

// See https://wxt.dev/api/config.html
export default defineConfig({
	modules: ["@wxt-dev/module-react", "@wxt-dev/i18n/module"],
	vite: () => ({
		plugins: [tailwindcss()],
		define: {
			"import.meta.env.WXT_HOMEPAGE_URL": JSON.stringify(process.env.WXT_HOMEPAGE_URL || "https://webdev-hq.com")
		}
	}),
	manifest: {
		default_locale: "en",
		icons: {
			16: "icon/16.png",
			32: "icon/32.png",
			48: "icon/48.png",
			128: "icon/128.png"
		},
		permissions: [
			"activeTab",
			"bookmarks",
			"contextMenus",
			"cookies",
			"downloads",
			"history",
			"management",
			"tabs",
			"tabGroups",
			"topSites",
			"storage",
			"sidePanel",
			"system.cpu",
			"system.memory",
			"system.storage"
		],
		side_panel: {
			default_path: "sidepanel.html"
		},
		content_scripts: [
			{
				js: ["content-scripts/content.js"],
				matches: ["*://*/*"]
			}
		],
		// host_permissions: ["<all_urls>"],
		host_permissions: ["https://webdev-hq.com/*"],
		background: {
			service_worker: "background.js"
		}
	}
});
