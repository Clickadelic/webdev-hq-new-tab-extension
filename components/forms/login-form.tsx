import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { LoginSchema } from "@/schemas";
import { FormError } from "@/components/global/forms/form-error";
import { FormSuccess } from "@/components/global/forms/form-success";
import { cn } from "@/lib/utils";
import { decodeJwt, JwtPayload, handleLogout } from "@/lib/utils";

interface LoginFormProps {
	className?: string;
}

const LoginForm = ({ className }: LoginFormProps) => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string>();
	const [success, setSuccess] = useState<string>();
	const [user, setUser] = useState<JwtPayload | null>(null);

	const form = useForm<z.infer<typeof LoginSchema>>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: "",
			password: ""
		}
	});

	/**
	 * Beim Mount: Token aus Storage laden & validieren
	 */
	useEffect(() => {
		chrome.storage.local.get(["authToken"], result => {
			if (!result.authToken) return;

			const token = result.authToken as string;
			const payload = decodeJwt(token);

			if (payload) {
				// Standard JWT - check expiration
				if (payload.exp * 1000 < Date.now()) {
					chrome.storage.local.remove("authToken");
					return;
				}
				setUser(payload);
			} else {
				// Sanctum token - assume valid for 7 days
				setUser({
					id: "0",
					username: "User",
					email: "",
					exp: Date.now() + 60 * 60 * 24 * 7 * 1000
				});
			}
		});
	}, []);

	/**
	 * Login
	 */
	const handleSubmit = async (values: z.infer<typeof LoginSchema>) => {
		setError(undefined);
		setSuccess(undefined);
		setIsLoading(true);

		try {
			const apiVersion = import.meta.env.WXT_API_VERSION ?? "v1";
			const response = await fetch(`${import.meta.env.WXT_HOMEPAGE_URL}/api/${apiVersion}/auth/login`, {
				method: "POST",
				headers: { "Content-Type": "application/json", "Accept": "application/json" },
				body: JSON.stringify(values)
			});

			const contentType = response.headers.get("content-type") || "";
			let data: any = null;
			if (contentType.includes("application/json")) {
				data = await response.json();
			} else {
				const text = await response.text();
				throw new Error(chrome.i18n.getMessage("invalid_server_response", "Invalid server response") + ` (${contentType}): ${text.substring(0, 200)}`);
			}
			if (!response.ok) {
				throw new Error(data.message || chrome.i18n.getMessage("login_failed", "Login failed"));
			}

			// Handle Sanctum token (format: "number|random") or JWT
			const token = data.token;
			const payload = decodeJwt(token);

			await chrome.storage.local.set({ authToken: token });

			if (payload) {
				// Standard JWT
				setUser(payload);
			} else {
				// Sanctum token - use user data from response
				setUser({
					id: String(data.user?.id || "0"),
					username: data.user?.name || data.user.username,
					email: values.email,
					exp: Date.now() + 60 * 60 * 24 * 7 * 1000 // 7 days default
				});
			}

			setSuccess(chrome.i18n.getMessage("login_success", "Login successful"));
			form.reset();
		} catch (err: any) {
			setError(err.message || chrome.i18n.getMessage("unknown_error", "Unknown error"));
		} finally {
			setIsLoading(false);
		}
	};

	if (user) {
		return (
			<div className="bg-white/30 dark:bg-slate-800/30 rounded p-1 backdrop-blur">
				<div className={cn("bg-white dark:bg-slate-800 rounded p-3 flex flex-col gap-3", className)}>
					<div className="flex flex-col items-center gap-4">
						<span className="sr-only">{chrome.i18n.getMessage("your_account")}</span>
						<div className="space-y-2 text-center">
							<h1 className="text-xl font-medium">{chrome.i18n.getMessage("your_account", "Account")}</h1>
							<p className="text-center text-sm text-muted-foreground">Welcome back, {user.username}!</p>
						</div>
					</div>
					<Button onClick={handleLogout} className="hover:underline">
						{chrome.i18n.getMessage("logout", "Logout")}
					</Button>
				</div>
			</div>
		);
	}

	return (
		<div className="bg-white/30 dark:bg-slate-800/30 rounded p-1 backdrop-blur">
			<div className={cn("bg-white dark:bg-slate-800 rounded p-3 flex flex-col gap-3", className)}>
				<div className="flex flex-col items-center gap-4">
					<span className="sr-only">{chrome.i18n.getMessage("login")}</span>
					<div className="space-y-2 text-center">
						<h1 className="text-xl font-medium">{chrome.i18n.getMessage("login")}</h1>
						<p className="text-center text-sm text-muted-foreground">Welcome back</p>
					</div>
				</div>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-4">
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{chrome.i18n.getMessage("email", "E-Mail")}</FormLabel>
									<FormControl>
										<Input type="email" placeholder={chrome.i18n.getMessage("email", "E-Mail")} disabled={isLoading} autoComplete="email" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{chrome.i18n.getMessage("password", "Password")}</FormLabel>
									<FormControl>
										<Input type="password" placeholder={chrome.i18n.getMessage("password", "Password")} disabled={isLoading} autoComplete="password" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button type="submit" variant="primary" disabled={isLoading} className="bg-primary hover:bg-primary-hover text-white rounded-md">
							{isLoading ? chrome.i18n.getMessage("loading", "Loading...") : chrome.i18n.getMessage("login", "Login")}
						</Button>

						{error && <FormError message={error} />}
						{success && <FormSuccess message={success} />}
					</form>
				</Form>
				<p className="flex gap-2 items-center justify-center text-xs text-white">
					<a href="https://webdev-hq.com/forgot-password" className="text-xs text-white w-full hover:underline" target="_blank">
						{chrome.i18n.getMessage("forgot_password", "Forgot password?")}
					</a>
				</p>
				<p className="flex gap-2 items-center justify-center text-xs text-white">
					{chrome.i18n.getMessage("dont_have_an_account", "Don't have an account?")}
					<a href="https://webdev-hq.com/register" className="text-xs text-white hover:underline" target="_blank">
						{chrome.i18n.getMessage("register", "Register")}
					</a>
				</p>
			</div>
		</div>
	);
};

export default LoginForm;
