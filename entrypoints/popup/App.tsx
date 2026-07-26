import { Button } from "@/components/ui/button";
import { AiOutlineBug } from "react-icons/ai";
import { JwtPayload, decodeJwt, handleLogout } from "@/lib/utils";
import { useEffect, useState } from "react";
import Logo from "@/components/Logo";
import LoginForm from "@/components/forms/login-form";
import { ThemeProvider } from "@/components/ThemeProvider";
import { dailySalutation } from "@/lib/utils";
const App = () => {
	const [user, setUser] = useState<JwtPayload | null>(null);

	/**
	 * Beim Mount: Token aus Storage laden & validieren
	 */
	useEffect(() => {
		chrome.storage.local.get(["authToken"], async result => {
			if (!result.authToken) return;

			const token = result.authToken as string;

			try {
				// Fetch the user data from your Fortify/Sanctum backend
				const response = await fetch(`${import.meta.env.WXT_HOMEPAGE_URL}/api/user`, {
					headers: {
						Authorization: `Bearer ${token}`,
						Accept: "application/json"
					}
				});

				if (!response.ok) throw new Error("Token invalid");

				const userData = await response.json();

				// Set the state with the actual data from Laravel
				setUser({
					id: String(userData.id),
					username: userData.name || userData.username || "User",
					email: userData.email,
					exp: Date.now() + 60 * 60 * 24 * 7 * 1000
				});
			} catch (err) {
				console.error("Session expired or invalid token", err);
				chrome.storage.local.remove("authToken");
				setUser(null);
			}
		});
	}, []);

	useEffect(() => {
		const handleStorageChange = (changes: { [key: string]: chrome.storage.StorageChange }, areaName: string) => {
			if (areaName === "local" && changes.authToken) {
				if (!changes.authToken.newValue) {
					setUser(null);
				}
			}
		};
	}, []);

	return (
		<ThemeProvider>
			<div className="p-4 w-96 bg-white dark:bg-slate-800">
				<Logo url={import.meta.env.WXT_HOMEPAGE_URL} />
				{user ? (
					<>
						<div className="flex flex-col justify-between items-center gap-4">
							<p className="text-lg text-center text-slate-800 dark:text-slate-200">
								{dailySalutation()}, {user.username}!
							</p>
						</div>
						<Button onClick={handleLogout} variant="secondary" className="w-full">
							Abmelden
						</Button>
					</>
				) : (
					<LoginForm className="flex" />
				)}
			</div>
		</ThemeProvider>
	);
};

export default App;
