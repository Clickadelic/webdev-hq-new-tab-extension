import { useEffect, useRef, useState } from "react"
import { useSettingsStore } from "@/stores/use-settings-store"

import { Button } from "@/components/ui/button"
import { RiCloseFill } from "react-icons/ri"
import { AiOutlineSearch } from "react-icons/ai"
import { BsChevronDown } from "react-icons/bs"

import { cn } from "@/lib/utils"

import { engines } from "@/lib/search-engines"

interface MultiSearchProps {
	classNames?: string
}

const MultiSearch = ({ classNames }: MultiSearchProps) => {
	const searchPlaceholder: string = chrome.i18n.getMessage("search_placeholder", "Search")
	const { searchQuery, searchEngine, setSearchQuery, setSearchEngine } = useSettingsStore()
	const [dropdownOpen, setDropdownOpen] = useState(false)
	const dropdownRef = useRef<HTMLDivElement>(null)
	// engines 3 = google default
	const currentEngine = engines.find(e => e.url === searchEngine) ?? engines[3]

	const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(e.target.value)
	}

	const handleEngineChange = (url: string) => {
		setSearchEngine(url)
		setDropdownOpen(false)
	}

	const clearInputField = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		setSearchQuery("")
		setDropdownOpen(false)
	}

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setDropdownOpen(false)
			}
		}

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				setDropdownOpen(false)
			}

			if (event.key === "Enter") {
				const activeElement = document.activeElement
				if (activeElement instanceof HTMLInputElement) {
					activeElement.form?.requestSubmit()
				}
			}
		}

		document.addEventListener("mousedown", handleClickOutside)
		document.addEventListener("keydown", handleKeyDown)

		return () => {
			document.removeEventListener("mousedown", handleClickOutside)
			document.removeEventListener("keydown", handleKeyDown)
		}
	}, [])

	return (
		<div className={cn("relative w-full z-50 bg-white flex flex-row gap-1 p-1 rounded items-center dark:bg-slate-800/30", classNames)}>
			<form method="GET" action={`${searchEngine}${encodeURIComponent(searchQuery)}`} className="w-full bg-white dark:bg-slate-800 flex flex-row gap-1 p-1 rounded items-center">
				<input type="text" name="q" value={searchQuery} onChange={handleQueryChange} className="py-1 pr-2 pl-3 focus:outline-none w-full text-xl" placeholder={searchPlaceholder} />
				{searchQuery.length >= 1 && (
					<div className="relative">
						<Button className="hover:cursor-pointer" variant="ghost" onClick={clearInputField}>
							<RiCloseFill />
						</Button>
					</div>
				)}

				<div className="relative" ref={dropdownRef}>
					<Button type="button" className="flex items-center gap-2 hover:cursor-pointer" variant="ghost" onClick={() => setDropdownOpen(prev => !prev)}>
						{currentEngine.icon}
						<span className="hidden md:inline dark:text-slate-500">{currentEngine.name}</span>
						<span className={cn("ml-2 transition-transform ease-in-out duration-300", dropdownOpen ? "rotate-180" : "")} data-rotate={dropdownOpen ? "rotate-180" : ""}>
							<BsChevronDown />
						</span>
					</Button>

					{dropdownOpen && (
						<div className="-left-3 z-50 absolute bg-white dark:bg-slate-700 shadow-lg mt-1 border rounded w-48">
							{engines.map(engine => (
								<button
									key={engine.name}
									type="button"
									className="flex items-center gap-2 hover:bg-gray-200 dark:hover:bg-slate-600 px-4 py-2 w-full text-left hover:cursor-pointer dark:text-slate-300"
									onClick={() => handleEngineChange(engine.url)}
								>
									{engine.icon}
									{engine.name}
								</button>
							))}
						</div>
					)}
				</div>

				<Button type="submit" variant="primary" className="py-2 px-3">
					<AiOutlineSearch />
				</Button>
			</form>
		</div>
	)
}

export default MultiSearch
