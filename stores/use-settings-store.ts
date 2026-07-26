import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SettingsStore {
	searchQuery: string;
	searchEngine: string;
	setSearchQuery: (query: string) => void;
	setSearchEngine: (engineUrl: string) => void;
	defaultPage: string;
	setDefaultPage: (page: string) => void;
}

export const useSettingsStore = create<SettingsStore>()(
	persist(
		set => ({
			// Search Engine Settings
			searchQuery: "",
			searchEngine: "https://www.google.com/search?q=",
			setSearchQuery: query => set({ searchQuery: query }),
			setSearchEngine: engineUrl => set({ searchEngine: engineUrl }),
			// Standard-Tab Einstellungen
			defaultPage: "Dashboard", // Set default-page
			setDefaultPage: page => set({ defaultPage: page })
		}),
		{
			name: "wdhq-settings-store" // Name im localStorage (oder IndexedDB)
		}
	)
);
