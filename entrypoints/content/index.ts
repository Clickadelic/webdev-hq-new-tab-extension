export default defineContentScript({
	registration: "runtime",
	matches: [],
	cssInjectionMode: "ui",

	async main(ctx) {
		const getFaviconUrl = (): string | null => {
			const faviconLink = document.querySelector("link[rel~='icon'], link[rel='shortcut icon']") as HTMLLinkElement | null;
			if (!faviconLink?.href) {
				return null;
			}

			try {
				return new URL(faviconLink.href, window.location.href).toString();
			} catch {
				return faviconLink.href;
			}
		};

		const saveWebpageToHeadquarter = async () => {
			const apiVersion = import.meta.env.WXT_API_VERSION ?? "v1";
			const title =
				document.title?.trim() || document.querySelector('meta[property="og:title"]')?.getAttribute("content")?.trim() || document.querySelector("h1")?.textContent?.trim() || "Untitled page";
			const description =
				document.querySelector('meta[name="description"]')?.getAttribute("content")?.trim() || document.querySelector('meta[property="og:description"]')?.getAttribute("content")?.trim() || "";
			const payload = {
				title,
				url: window.location.href,
				favicon_url: getFaviconUrl(),
				description,
				category: null,
				status: "published",
				tags: []
			};

			// Delegate the network request to the background service worker to avoid CORS
			return new Promise((resolve, reject) => {
				chrome.runtime.sendMessage(
					{
						action: "saveWebpageToHeadquarter",
						apiVersion,
						payload
					},
					(response: any) => {
						if (!response) return reject(new Error("No response from background service worker"));
						if (response.success) return resolve(response.data);
						return reject(new Error(response.error || "Failed to save webpage"));
					}
				);
			});
		};

		chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
			if (request.command === "toggleStylesheet") {
				const existingLink = document.getElementById("webdev-hq-debug-stylesheet");

				if (existingLink) {
					existingLink.remove();
					console.log("Debug CSS deactivated.");
				} else {
					const link = document.createElement("link");
					link.id = "webdev-hq-debug-stylesheet";
					link.rel = "stylesheet";
					link.href = chrome.runtime.getURL(request.stylesheet);
					document.head.appendChild(link);
					console.log("Debug CSS activated.");
				}
				return false;
			}

			if (request.command === "saveWebpageToHeadquarter" || request.command === "saveWebpageToHeadquarterz") {
				saveWebpageToHeadquarter()
					.then(() => sendResponse({ success: true }))
					.catch(error => {
						console.error("Failed to save webpage to WebDev HQ:", error);
						sendResponse({ success: false, error: error.message });
					});
				return true;
			}

			return false;
		});
	}
});
