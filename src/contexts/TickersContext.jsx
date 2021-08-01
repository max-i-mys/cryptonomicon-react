import { createContext, useEffect, useReducer, useState } from "react"
import { getTickers } from "../api/crud"
import { getAllCoins } from "../api/cryptocompare"

export const TickersContext = createContext()

const initialState = []
export default function TickersProvider({ children }) {
	const [activeDataTicker, setActiveDataTicker] = useState(null)
	const [activePrice, setActivePrice] = useState([])
	const [tickers, dispatchTickers] = useReducer(reducer, initialState)

	function reducer(state, action) {
		switch (action.type) {
			case "INITIAL":
				return action.payload
			case "ADD":
				return [...state, action.payload]
			case "DELETE": {
				const idx = state.findIndex(ticker => ticker.id === action.payload)
				const newState = [...state]
				if (idx !== -1) {
					newState.splice(idx, 1)
				}
				return newState
			}
			default:
				throw new Error(`Wrong action type: ${action.type}`)
		}
	}
	useEffect(() => {
		;(async () => {
			const [tickersData, tickersDataErr] = await getTickers()
			if (!tickersDataErr) {
				dispatchTickers({ type: "INITIAL", payload: tickersData })
			}
			if (tickersDataErr) {
				new Error("Error while fetching data!")
			}
		})()
	}, [])
	useEffect(() => {
		;(async () => {
			const [coinsData, coinsDataErr] = await getAllCoins()
			if (!coinsDataErr) {
				const allCoins = Object.values(coinsData.Data).map(coin => coin.symbol)
				console.log(allCoins)
			}
		})()
	}, [])
	return (
		<>
			<TickersContext.Provider
				value={[
					tickers,
					dispatchTickers,
					activeDataTicker,
					setActiveDataTicker,
					activePrice,
					setActivePrice,
				]}
			>
				{children}
			</TickersContext.Provider>
		</>
	)
}
