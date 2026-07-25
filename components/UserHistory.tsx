import { useState, useEffect } from "react"
import { BsTrash } from "react-icons/bs"
import { Button } from "@/components/ui/button"

import { getFaviconUrl, deleteUserHistory } from "@/lib/utils"

const fallbackFavicon = "/assets/icons/default-website-favicon.png" // Stelle sicher, dass dieses Bild in deinem `public`-Ordner liegt
import { RiResetLeftLine } from "react-icons/ri"
const UserHistory = () => {
	const noHistoryFoundLabel = chrome.i18n.getMessage("no_history_found", "No history found")

	const [history, setHistory] = useState<chrome.history.HistoryItem[]>([])

	useEffect(() => {
		chrome.runtime.sendMessage({ action: "getHistory" }, response => {
			if (response && response.history) {
				setHistory(response.history)
			}
		})
	}, [history])

	return (
		<>
			{history.length === 0 ? (
				<div className="bg-white/30 dark:bg-slate-800/30 backdrop p-1 rounded backdrop-blur">
					<div className="bg-white dark:bg-slate-800 rounded p-2">
						<p className="text-center text-md text-slate-500 dark:text-slate-300 my-1.5">{noHistoryFoundLabel}</p>
					</div>
				</div>
			) : (
				<div className="bg-white/30 dark:bg-slate-800/30 backdrop p-1 rounded backdrop-blur">
					<ul className="w-full bg-white dark:bg-slate-800 rounded">
						{history.map(entry => (
							<li key={entry.id} className="flex flex-row justify-between items-start p-1">
								<a href={entry.url} className="flex justify-between gap-2 p-2 rounded text-md w-full truncate hover:text-primary" target="_blank" rel="noopener noreferrer">
									<div className="flex w-full justify-start gap-2">
										{entry.url && (
											<img
												src={getFaviconUrl(entry.url)}
												onError={e => {
													e.currentTarget.src = fallbackFavicon
												}}
												alt="Favicon"
												className="size-4 rounded-sm"
												referrerPolicy="no-referrer"
											/>
										)}
										{entry.title || entry.url}
									</div>
									{entry.lastVisitTime && (
										<span className="text-xs text-slate-500">
											{new Intl.DateTimeFormat("de-DE", {
												dateStyle: "medium",
												timeStyle: "short"
											}).format(entry.lastVisitTime)}
											&nbsp;{chrome.i18n.getMessage("o_clock")}
										</span>
									)}
								</a>
								<Button
									onClick={() => {
										if (entry.url) {
											chrome.history.deleteUrl({ url: entry.url }, () => {
												setHistory(prev => prev.filter(item => item.url !== entry.url))
											})
										}
									}}
									variant="ghost"
									size="sm"
									className="text-slate-400 hover:text-rose-400"
								>
									<BsTrash className="size-4" />
								</Button>
							</li>
						))}
					</ul>
					<Button
						onClick={async () => {
							await deleteUserHistory()
							setHistory([]) // UI leeren
						}}
						variant="secondary"
						className="w-full mt-2 bg-white dark:bg-slate-800 rounded hover:cursor-pointer"
						title={chrome.i18n.getMessage("delete_history", "Delete history")}
					>
						<RiResetLeftLine className="mr-2 size-3" />
						{chrome.i18n.getMessage("delete_history", "Delete history")}
					</Button>
				</div>
			)}
		</>
	)
}

export default UserHistory
