import { useContext } from "react"
import { TicketsContext } from "../contexts/TicketsContext"

export default function useTickets() {
	return useContext(TicketsContext)
}
