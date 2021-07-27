import { createContext, useEffect, useReducer } from "react"

export const TicketsContext = createContext()

export default function TicketsProvider({ children }) {
	return (
		<>
			<TicketsContext.Provider value="100">{children}</TicketsContext.Provider>
		</>
	)
}
