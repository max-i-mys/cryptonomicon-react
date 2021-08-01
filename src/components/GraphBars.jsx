import useTicker from "../hooks/useTickers"

export default function GraphBars() {
	const [, , , , activePrice] = useTicker()

	const normalizePrice = countArray => {
		const maxValue = Math.max(...countArray)
		const minValue = Math.min(...countArray)
		return countArray.map(
			price => 5 + ((price - minValue) * 95) / (maxValue - minValue)
		)
	}
	return (
		<>
			{normalizePrice(activePrice).length > 0 &&
				normalizePrice(activePrice).map((bar, index) => {
					return (
						<div
							key={index}
							style={{ height: bar + "%" }}
							className="bg-purple-800 border w-10"
						></div>
					)
				})}
		</>
	)
}
