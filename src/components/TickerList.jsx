import { useEffect, useState } from "react"
import { getTickets } from "../api/crud."
import Ticket from "./Ticket"

export default function TicketList() {
	const [tickets, setTickets] = useState([])

	useEffect(() => {
		;(async () => {
			const [ticketsData, ticketsDataError] = await getTickets()
			if (!ticketsDataError) {
				setTickets(ticketsData)
			}
		})()
	})
	return (
		<>
			{tickets &&
				tickets.map((ticket, index) => <Ticket key={index} ticket={ticket} />)}
		</>
	)
}
