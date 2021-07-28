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

export async function getTickers() {
	return await crud.get("/tickers")
}

export async function addTicker(data) {
	return await crud.post("/tickers", data)
}

export async function deleteTicker(id) {
	return await crud.delete(`/tickers/${id}`)
}
