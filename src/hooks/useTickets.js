import { useContext } from "react"
import { TicketsContext } from "../components/contexts/TicketsContext"

export default function useTickets() {
	return useContext(TicketsContext)
}
