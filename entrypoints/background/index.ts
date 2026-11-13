export default defineBackground(() => {
	// 1. Central Install - startup & restart event
	chrome.runtime.onInstalled.addListener(() => {
		console.log(chrome.i18n.getMessage("console_log_on_installed", "WebDev HQ Chrome-Extension installed."));

		// Load seasonal image data
		fetchSeasonalImage().catch(console.error);
	});

	// 2. Helper & Storage Logic
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

	// 3. Auto-update on tabs
	chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
		if (changeInfo.status === "complete") {
			fetchSeasonalImage().catch(err => console.error("Auto-update failed:", err));
		}
	});

	// 4. Central message listener
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
	});
});
