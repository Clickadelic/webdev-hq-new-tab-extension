export default defineBackground(() => {
	function getMenuTitle(messageName: string, fallback: string): string {
		return chrome.i18n.getMessage(messageName, fallback) || fallback;
	}

	function registerContextMenus() {
		chrome.contextMenus.removeAll(() => {
			chrome.contextMenus.create({
				id: "webdev-hq-inject-css",
				title: getMenuTitle("enable_disable_debug_css", "Enable/Disable Debug CSS"),
				type: "normal",
				contexts: ["selection", "page"]
			});

			chrome.contextMenus.create({
				id: "webdev-hq-save-webpage",
				title: getMenuTitle("save_webpage_to_headquarter", "Save webpage to WebDev HQ"),
				type: "normal",
				contexts: ["selection", "page"]
			});
		});
	}

	// ==========================================
	// 1. ZENTRALES INSTALL- / START-EVENT
	// ==========================================
	chrome.runtime.onInstalled.addListener(() => {
		console.log(chrome.i18n.getMessage("console_log_on_installed", "WebDev HQ Chrome-Extension installed."));

		// Seasonal-Image Daten laden
		fetchSeasonalImage().catch(console.error);
		registerContextMenus();
	});

	chrome.runtime.onStartup.addListener(() => {
		registerContextMenus();
	});

	registerContextMenus();

	// ==========================================
	// 2. HELPER & STORAGE LOGIK
	// ==========================================
	interface StorageData {
		backgroundImageUrl?: string;
		lastFetchedDate?: string;
		seasonalImageResponse?: any;
	}

	function setToStorage(items: Record<string, any>): Promise<void> {
		return new Promise((resolve, reject) => {
			chrome.storage.local.set(items, () => {
				const err = chrome.runtime.lastError;
				if (err) reject(err);
				else resolve();
			});
		});
	}

	function getFromStorage<T>(keys: string[]): Promise<T> {
		return new Promise((resolve, reject) => {
			chrome.storage.local.get(keys, items => {
				const err = chrome.runtime.lastError;
				if (err) reject(err);
				else resolve(items as T);
			});
		});
	}

	async function fetchSeasonalImage(): Promise<any> {
		const today = new Date().toISOString().split("T")[0];
		try {
			const data = await getFromStorage<StorageData>(["seasonalImageResponse", "lastFetchedDate"]);
			if (data.seasonalImageResponse && data.lastFetchedDate === today) {
				return data.seasonalImageResponse;
			} else {
				const apiVersion = import.meta.env.WXT_API_VERSION ?? "v1";
				const res = await fetch(`${import.meta.env.WXT_HOMEPAGE_URL}/api/${apiVersion}/unsplash/image/seasonal`);
				const json = await res.json();

				if (!json?.data?.urls) {
					throw new Error("Invalid API response structure");
				}

				const imageUrl = json.data.urls.full || json.data.urls.raw || json.data.urls.regular;
				console.log("Fetched new seasonal image:", imageUrl);
				await setToStorage({
					seasonalImageResponse: json,
					lastFetchedDate: today,
					backgroundImageUrl: imageUrl
				});

				return json;
			}
		} catch (e) {
			console.error("Error fetching seasonal image:", e);
			return { error: "fetch_failed" };
		}
	}

	function getHistory() {
		return new Promise((resolve, reject) => {
			chrome.history.search({ text: "", maxResults: 10 }, function (results) {
				resolve(results);
			});
		});
	}

	// ==========================================
	// 3. AUTO-UPDATE BEI TABS
	// ==========================================
	chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
		if (changeInfo.status === "complete") {
			fetchSeasonalImage().catch(err => console.error("Auto-update failed:", err));
		}
	});

	// ==========================================
	// 4. KONTEXTMENÜ KLICK
	// ==========================================
	chrome.contextMenus.onClicked.addListener((info, tab) => {
		if (info.menuItemId === "webdev-hq-inject-css" && tab?.id) {
			// Wir senden jetzt "toggleStylesheet" statt fest "inject"
			chrome.tabs.sendMessage(tab.id, {
				command: "toggleStylesheet",
				stylesheet: "assets/pesticide.css"
			});
		}
	});
	chrome.contextMenus.onClicked.addListener((info, tab) => {
		if (info.menuItemId === "webdev-hq-save-webpage" && tab?.id) {
			// Wir senden jetzt "saveWebpage"
			chrome.tabs.sendMessage(tab.id, {
				command: "saveWebpageToHeadquarter",
				stylesheet: "assets/pesticide.css"
			});
		}
	});

	// ==========================================
	// 5. EXTENSION ICON (ACTION BUTTON) KLICK
	// ==========================================
	chrome.action.onClicked.addListener(tab => {
		if (!tab.id) return;

		chrome.scripting.executeScript({
			target: { tabId: tab.id },
			files: ["meazure-script.js"]
		});

		// Auch hier senden wir jetzt den Toggle-Befehl
		chrome.tabs.sendMessage(tab.id, {
			command: "toggleStylesheet",
			stylesheet: "assets/pesticide.css"
		});

		// Auch hier senden wir jetzt den Save-Befehl
		chrome.tabs.sendMessage(tab.id, {
			command: "saveWebpageToHeadquarter",
			stylesheet: "assets/pesticide.css"
		});
	});

	// ==========================================
	// 6. ZENTRALER MESSAGE LISTENER
	// ==========================================
	chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
		console.log("Background received message:", message);

		if (message.action === "getRandomImage") {
			fetchSeasonalImage()
				.then(response => sendResponse(response))
				.catch(error => {
					console.error("Error in fetchSeasonalImage:", error);
					sendResponse({ error: "fetch_failed" });
				});
			return true;
		}

		if (message.action === "getHistory") {
			getHistory().then(history => sendResponse({ history }));
			return true;
		}

		if (message.action === "saveWebpageToHeadquarter") {
			const apiVersion = message.apiVersion || import.meta.env.WXT_API_VERSION || "v1";
			const payload = message.payload;

			// Read auth token from storage
			chrome.storage.local.get(["authToken"], async items => {
				const token = items.authToken as string | undefined;
				if (!token) {
					// Prompt user to login: try to open the extension popup, otherwise open the web login page
					try {
						if (chrome.action && (chrome.action as any).openPopup) {
							(chrome.action as any).openPopup();
						} else {
							chrome.tabs.create({ url: `${import.meta.env.WXT_HOMEPAGE_URL}/login` });
						}
					} catch (e) {
						try {
							chrome.tabs.create({ url: `${import.meta.env.WXT_HOMEPAGE_URL}/login` });
						} catch (_) {}
					}

					sendResponse({ success: false, error: "No auth token available" });
					return;
				}

				try {
					const res = await fetch(`${import.meta.env.WXT_HOMEPAGE_URL}/api/${apiVersion}/hyperlinks`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							"Accept": "application/json",
							"Authorization": `Bearer ${token}`
						},
						body: JSON.stringify(payload)
					});

					const data = await res.json().catch(() => null);
					if (!res.ok) {
						sendResponse({ success: false, error: data?.message || "Unable to save this page to WebDev HQ." });
						return;
					}
					sendResponse({ success: true, data });
				} catch (err: any) {
					sendResponse({ success: false, error: err.message || String(err) });
				}
			});

			return true;
		}
	});
});
