import { createContext, useEffect, useReducer } from "react"
import { getTickets } from "../../api/crud"

export const TicketsContext = createContext()

const initialState = []
export default function TicketsProvider({ children }) {
	useEffect(() => {
		;(async () => {
			const [ticketsData, ticketsDataErr] = await getTickets()
			if (!ticketsDataErr) {
				dispatchTickets({ type: "INITIAL", payload: ticketsData })
			}
			if (ticketsDataErr) {
				new Error("Error while fetching data!")
			}
		})()
	}, [])
	const [tickets, dispatchTickets] = useReducer(reducer, initialState)

	function reducer(state, action) {
		switch (action.type) {
			case "INITIAL":
				return action.payload
			case "ADD":
				return [...state, action.payload]
			case "UPDATE": {
			}
			// case "DELETE": {

			// }
			// eslint-disable-next-line no-fallthrough
			default:
				throw new Error(`Wrong action type: ${action.type}`)
		}
	}
	return (
		<>
			<TicketsContext.Provider value={[tickets, dispatchTickets]}>
				{children}
			</TicketsContext.Provider>
		</>
	)
}
