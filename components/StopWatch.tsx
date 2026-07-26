import { useState } from "react";
import { cn } from "@/lib/utils";
import { LuClock } from "react-icons/lu";
import { RiResetLeftLine } from "react-icons/ri";
import { FaPlay, FaPause } from "react-icons/fa6";
interface StopWatchProps {
	className?: string;
}

export default function StopWatch({ className }: StopWatchProps) {
	const [time, setTime] = useState({
		sec: 0,
		min: 0,
		hr: 0
	});

	const [intervalId, setIntervalId] = useState<ReturnType<typeof setInterval> | null>(null);

	const updateTimer = () => {
		setTime(prev => {
			let newTime = { ...prev };
			// update sec and see if we need to increase min
			if (newTime.sec < 59) newTime.sec += 1;
			else {
				newTime.min += 1;
				newTime.sec = 0;
			}
			// min has increased in *newTime* by now if it was updated, see if it has crossed 59
			if (newTime.min === 60) {
				newTime.min = 0;
				newTime.hr += 1;
			}

			return newTime;
		});
	};

	const pauseOrResume = () => {
		if (!intervalId) {
			let id = setInterval(updateTimer, 1000);
			setIntervalId(id);
		} else {
			clearInterval(intervalId);
			setIntervalId(null);
		}
	};

	const reset = () => {
		if (intervalId) clearInterval(intervalId);
		setTime({
			sec: 0,
			min: 0,
			hr: 0
		});
	};

	return (
		<div className={cn("w-64 bg-white/30 dark:bg-slate-800/30 flex flex-col items-center justify-center gap-2 p-1 rounded", className)}>
			<div className="w-full bg-white dark:bg-slate-800 rounded p-3 flex flex-col gap-2 text-slate-800 dark:text-white">
				<h2 className="text-lg flex gap-2 justify-center items-center cursor-default">
					<LuClock />
					{chrome.i18n.getMessage("timer", "Timer")}
				</h2>
				<h2 className="text-center text-lg cursor-default">{`${time.hr < 10 ? 0 : ""}${time.hr} : ${time.min < 10 ? 0 : ""}${time.min} : ${time.sec < 10 ? 0 : ""}${time.sec}`}</h2>
				<button
					onClick={pauseOrResume}
					className="text-lg flex items-center justify-center text-center hover:cursor-pointer hover:text-slate-500"
					title={chrome.i18n.getMessage("start", "Start")}
					aria-label={chrome.i18n.getMessage("start", "Start")}
				>
					{intervalId ? (
						<div className="flex mx-auto gap-2">
							<FaPause className="mt-1.5" />
							{chrome.i18n.getMessage("pause", "Pause")}
						</div>
					) : (
						<div className="flex mx-auto gap-2">
							<FaPlay className="mt-1.5" />
							{chrome.i18n.getMessage("start", "Start")}
						</div>
					)}
				</button>
				<button
					className="flex gap-2 items-center justify-center hover:cursor-pointer hover:text-slate-500"
					onClick={reset}
					title={chrome.i18n.getMessage("reset", "Reset")}
					aria-label={chrome.i18n.getMessage("reset", "Reset")}
				>
					<RiResetLeftLine />
					{chrome.i18n.getMessage("reset", "Reset")}
				</button>
			</div>
		</div>
	);
}
