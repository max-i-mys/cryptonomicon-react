import axios from "axios"
import { BASE_URL } from "./constants"

const crud = axios.create({
	baseURL: BASE_URL,
	headers: {
		"Content-type": "application/json; charset=UTF-8",
	},
})

crud.interceptors.response.use(
	response => {
		return [response.data, null]
	},
	error => {
		return [null, error]
	}
)

export async function getTickets() {
	return await crud.get("/tickets")
}

export async function addTicket(data) {
	return await crud.post("/tickets", data)
}

export async function deleteTicket(id) {
	return await crud.delete(`/tickets/${id}`)
}
