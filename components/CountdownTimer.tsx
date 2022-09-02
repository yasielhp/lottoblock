import { useContract, useContractData } from '@thirdweb-dev/react'
import Countdown from 'react-countdown'

type Props = {
	hours: number
	minutes: number
	seconds: number
	completed: boolean
}

export const CountdownTimer = () => {
	const { contract } = useContract(
		process.env.NEXT_PUBLIC_LOTTERY_CONTRACT_ADDRESS
	)
	const { data: expiration, isLoading: isLoadingExpiration } = useContractData(
		contract,
		'expiration'
	)
	const renderer = ({ hours, minutes, seconds, completed }: Props) => {
		if (completed) {
			return (
				<div>
					<h2 className="text-sm text-yellow-500 text-center animate-pulse my-3">
						Ticket sales have now closed for this draw
					</h2>
					<div className="flex space-x-2 md:space-x-2">
						<div className="flex-1">
							<div className="p-7 flex items-center justify-center text-5xl text-center rounded-lg w-[100px] lg:min-w-[130px] bg-stone-700 animate-pulse">
								{hours}
							</div>
							<div className="text-center uppercase text-sm pt-4 animate-pulse">
								Hours
							</div>
						</div>
						<div className="flex-1">
							<div className="p-7 flex items-center justify-center text-5xl text-center rounded-lg w-[100px] lg:min-w-[130px] bg-stone-700 animate-pulse">
								{minutes}
							</div>
							<div className="text-center uppercase text-sm pt-4 animate-pulse">
								Minutes
							</div>
						</div>
						<div className="flex-1">
							<div className="p-7 flex items-center justify-center text-5xl text-center rounded-lg w-[100px] lg:min-w-[130px] bg-stone-700 animate-pulse">
								{seconds}
							</div>
							<div className="text-center uppercase text-sm pt-4 animate-pulse">
								Seconds
							</div>
						</div>
					</div>
				</div>
			)
		} else {
			return (
				<div className="bg-stone-900 border-2 border-stone-700 rounded-md flex flex-col items-center justify-center pb-4 px-2">
					<h3 className="text-white text-lg my-2 text-center">
						Time Remaining
					</h3>
					<div className="flex space-x-2 md:space-x-2">
						<div className="flex-1">
							<div className="p-7 flex items-center justify-center text-5xl text-center rounded-lg w-[100px] lg:min-w-[130px] bg-stone-700 animate-pulse">
								{hours}
							</div>
							<div className="text-center uppercase text-sm pt-4">Hours</div>
						</div>
						<div className="flex-1">
							<div className="p-7 flex items-center justify-center text-5xl text-center rounded-lg w-[100px] lg:min-w-[130px] bg-stone-700 animate-pulse">
								{minutes}
							</div>
							<div className="text-center uppercase text-sm pt-4">Minutes</div>
						</div>
						<div className="flex-1">
							<div className="p-7 flex items-center justify-center text-5xl text-center rounded-lg w-[100px] lg:min-w-[130px] bg-stone-700 animate-pulse">
								{seconds}
							</div>
							<div className="text-center uppercase text-sm pt-4">Seconds</div>
						</div>
					</div>
				</div>
			)
		}
	}
	if (isLoadingExpiration) return null

	return (
		<div>
			<Countdown date={new Date(expiration * 1000)} renderer={renderer} />
		</div>
	)
}
