import axios from "axios"
import { CRYPTOCOMPARE_URL } from "./constants"

const crypto = axios.create({
	baseURL: CRYPTOCOMPARE_URL,
	headers: {
		"Content-type": "application/json; charset=UTF-8",
	},
})

crypto.interceptors.response.use(
	response => {
		return [response.data, null]
	},
	error => {
		return [null, error]
	}
)

export async function getPrice(current) {
	return await crypto.get(
		`/price?fsym=${current}&tsyms=USD&api_key=5689944663715e69a33cd6ffdd74a4b502e2306353403c25e18f2080284cfa0c`
	)
}
