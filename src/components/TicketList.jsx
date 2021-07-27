import useTickets from "../hooks/useTickets"
import Ticket from "./Ticket"
export default function TicketList() {
	const [tickets] = useTickets()
	return (
		<>
			{tickets &&
				tickets.map((ticket, index) => <Ticket key={index} ticket={ticket} />)}
		</>
	)
}
