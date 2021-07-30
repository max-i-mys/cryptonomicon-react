import React, { useState } from "react"
import { addTicker } from "../api/crud"
import useTickers from "../hooks/useTickers"
import { popularCurrency } from "../util/constants"

export default function Header() {
	const [currencyValue, setCurrencyValue] = useState(null)
	const [tickers, dispatch] = useTickers()
	const [showTitleIsTicker, setShowTitleIsTicker] = useState(false)
	async function handleAdd() {
		if (!currencyValue.trim()) {
			return
		}
		let refreshTitleIsTickerTimer = null
		clearTimeout(refreshTitleIsTickerTimer)
		const currencyValueUpp = currencyValue.trim().toUpperCase()
		const currencyInTickers = tickers.find(
			ticker => ticker.current === currencyValueUpp
		)
		if (!currencyInTickers) {
			const newTicker = {
				current: currencyValueUpp,
				price: "-",
			}
			const [newTickerData, newTickerDataErr] = await addTicker(newTicker)
			if (!newTickerDataErr) {
				dispatch({ type: "ADD", payload: newTickerData })
				setCurrencyValue(null)
				return
			}
			if (newTickerDataErr) {
				throw new Error("Error while adding data!")
			}
		}
		setShowTitleIsTicker(true)
		refreshTitleIsTickerTimer = setTimeout(
			() => setShowTitleIsTicker(false),
			2000
		)
	}
	return (
		<>
			<section>
				<div className="flex">
					<div className="max-w-xs">
						<label
							htmlFor="wallet"
							className="block text-sm font-medium text-gray-700"
						>
							Тикер
						</label>
						<div className="mt-1 relative rounded-md shadow-md">
							<input
								onChange={e => setCurrencyValue(() => e.target.value)}
								onKeyDown={e =>
									e.key === "Enter" && currencyValue ? handleAdd() : ""
								}
								value={currencyValue ? currencyValue : ""}
								type="text"
								name="wallet"
								id="wallet"
								className="block w-full pr-10 border-gray-300 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm rounded-md"
								placeholder="Например DOGE"
							/>
						</div>
						<div className="flex bg-white shadow-md p-1 rounded-md shadow-md flex-wrap">
							<span
								onClick={() => setCurrencyValue(() => popularCurrency[0])}
								className="inline-flex items-center px-2 m-1 rounded-md text-xs font-medium bg-gray-300 text-gray-800 cursor-pointer"
							>
								{popularCurrency[0]}
							</span>
							<span
								onClick={() => setCurrencyValue(() => popularCurrency[1])}
								className="inline-flex items-center px-2 m-1 rounded-md text-xs font-medium bg-gray-300 text-gray-800 cursor-pointer"
							>
								{popularCurrency[1]}
							</span>
							<span
								onClick={() => setCurrencyValue(() => popularCurrency[2])}
								className="inline-flex items-center px-2 m-1 rounded-md text-xs font-medium bg-gray-300 text-gray-800 cursor-pointer"
							>
								{popularCurrency[2]}
							</span>
							<span
								onClick={() => setCurrencyValue(() => popularCurrency[3])}
								className="inline-flex items-center px-2 m-1 rounded-md text-xs font-medium bg-gray-300 text-gray-800 cursor-pointer"
							>
								{popularCurrency[3]}
							</span>
						</div>
						{showTitleIsTicker && (
							<div className="text-sm text-red-600">
								Такой тикер уже добавлен
							</div>
						)}
					</div>
				</div>
				<button
					onClick={() => (currencyValue ? handleAdd() : "")}
					type="button"
					className="my-4 inline-flex items-center py-2 px-4 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-full text-white bg-gray-600 hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
				>
					{/* <!-- Heroicon name: solid/mail --> */}
					<svg
						className="-ml-0.5 mr-2 h-6 w-6"
						xmlns="http://www.w3.org/2000/svg"
						width="30"
						height="30"
						viewBox="0 0 24 24"
						fill="#ffffff"
					>
						<path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path>
					</svg>
					Добавить
				</button>
			</section>
		</>
	)
}
