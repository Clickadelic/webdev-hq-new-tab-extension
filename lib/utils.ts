import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const dailySalutation = () => {
	const date = new Date();
	const hours = date.getHours();
	if (hours < 12) {
		return chrome.i18n.getMessage("good_morning", "Good Morning");
	} else if (hours < 18) {
		return chrome.i18n.getMessage("good_afternoon", "Good Afternoon");
	} else {
		return chrome.i18n.getMessage("good_evening", "Good Evening");
	}
};

export const getUserInfo = (): Promise<chrome.identity.ProfileUserInfo> => {
	return new Promise(resolve => {
		chrome.identity.getProfileUserInfo(userInfo => {
			resolve(userInfo);
		});
	});
};

export function getFaviconUrl(websiteUrl: string, size = 32): string {
	if (websiteUrl) {
		try {
			const url = new URL(websiteUrl);
			return `https://www.google.com/s2/favicons?sz=${size}&domain_url=${url.origin}`;
		} catch {
			return "/assets/icons/default-favicon.png";
		}
	} else {
		return "/assets/icons/default-favicon.png";
	}
}

export function isDOM(Obj: any): Obj is Element {
	return Obj instanceof Element;
}

export function formatIsoDate(isoString: string | Date) {
	const date = new Date(isoString);
	return date.toLocaleDateString(chrome.i18n.getUILanguage(), {
		day: "2-digit",
		month: "short",
		year: "numeric"
	});
}
/**
 * Login & Auth Utilities
 *
 * JWT Payload Struktur (relevant für UI)
 */

export type JwtPayload = {
	id: string;
	username: string;
	email: string;
	role?: string;
	exp: number;
};

/**
 * Minimaler JWT Decoder (ohne Library)
 * Falls Token kein JWT ist (z.B. Sanctum), return null
 */
export const decodeJwt = (token: string): JwtPayload | null => {
	try {
		// Sanctum tokens have format "number|random" - not a JWT
		if (!token.includes(".")) {
			return null;
		}
		const base64 = token.split(".")[1];
		const json = atob(base64.replace(/-/g, "+").replace(/_/g, "/"));
		return JSON.parse(json);
	} catch {
		return null;
	}
};

/**
 * Logout
 */
export const handleLogout = async () => {
	await chrome.storage.local.remove("authToken");
	// setUser(null);
};
