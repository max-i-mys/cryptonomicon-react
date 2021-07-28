import { useContext } from "react"
import { TickersContext } from "../contexts/TickersContext"

export default function useTicker() {
	return useContext(TickersContext)
}
