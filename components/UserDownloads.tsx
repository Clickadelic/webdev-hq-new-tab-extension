import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"

interface DownloadItem {
	id: number
	filename: string
	url: string
	state: string
	bytesReceived: number
	totalBytes: number
}

const UserDownloads = () => {
	const [downloads, setDownloads] = useState<DownloadItem[]>([])

	const noDownloadsFoundLabel = chrome.i18n.getMessage("no_downloads_found", "No downloads found.")
	const fetchDownloads = () => {
		if (!chrome?.downloads?.search) return

		chrome.downloads.search({ limit: 10, orderBy: ["-startTime"] }, items => {
			const mapped = items.map(item => ({
				id: item.id,
				filename: item.filename.split("/").pop() || "Unbenannt",
				url: item.url,
				state: item.state,
				bytesReceived: item.bytesReceived,
				totalBytes: item.totalBytes
			}))
			setDownloads(mapped)
		})
	}

	useEffect(() => {
		fetchDownloads()
	}, [])

	const handleDelete = (id: number) => {
		chrome.downloads.erase({ id }, () => {
			setDownloads(prev => prev.filter(d => d.id !== id))
		})
	}

	const handleShowInFolder = (id: number) => {
		chrome.downloads.show(id)
	}

	return (
		<div className="w-full mx-auto">
			{downloads.length === 0 ? (
				<div className="bg-white/30 dark:bg-slate-800/30 backdrop p-1 rounded backdrop-blur">
					<div className="bg-white dark:bg-slate-800 rounded p-2">
						<p className="text-center text-md text-slate-500 dark:text-slate-300 my-1.5">{noDownloadsFoundLabel}</p>
					</div>
				</div>
			) : (
				<div className="bg-white/30 dark:bg-slate-800/30 backdrop p-1 rounded">
					<ul className="p-1 bg-white dark:bg-slate-800 rounded space-y-2">
						{downloads.map(d => (
							<li key={d.id} className="w-full p-1 rounded flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
								<div className="flex flex-col w-full overflow-hidden">
									<Button
										variant="link"
										className="m-0 p-1 pb-0 font-medium justify-start text-sm text-left text-primary hover:cursor-pointer hover:underline truncate"
										onClick={() => handleShowInFolder(d.id)}
									>
										{d.filename}
									</Button>
									<p className="text-xs text-gray-500 truncate">{d.url}</p>
								</div>

								<div className="flex items-center justify-between md:gap-4 md:justify-end w-full md:w-auto">
									<p className="text-xs text-gray-500 dark:text-slate-300 whitespace-nowrap">
										{d.state === "in_progress" ? `${Math.round((d.bytesReceived / d.totalBytes) * 100)}%` : d.state === "complete" ? "✅" : "❌"}
									</p>

									<Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700" onClick={() => handleDelete(d.id)}>
										<Trash2 className="size-4" />
									</Button>
								</div>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	)
}

export default UserDownloads
