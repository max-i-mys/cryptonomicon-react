import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App.jsx"
import TicketsProvider from "./contexts/TicketsContext"

ReactDOM.render(
	<React.StrictMode>
		<TicketsProvider>
			<App />
		</TicketsProvider>
	</React.StrictMode>,
	document.getElementById("root")
)
