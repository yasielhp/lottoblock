import {
	useContract,
	useContractData,
	useContractCall,
	useAddress,
} from '@thirdweb-dev/react'
import { NavButton, Loading, CountdownTimer } from './'
import { ethers } from 'ethers'
import { useState, useEffect } from 'react'
import { currency } from '../constants'
import toast from 'react-hot-toast'
import Marquee from 'react-fast-marquee'

export const Draw = () => {
	const address = useAddress()
	const [userTickets, setUserTickets] = useState(0)
	const [quantity, setQuantity] = useState<number>(1)
	const { contract, isLoading } = useContract(
		process.env.NEXT_PUBLIC_LOTTERY_CONTRACT_ADDRESS
	)
	const { data: expiration } = useContractData(contract, 'expiration')
	const { data: remainingTickets } = useContractData(
		contract,
		'RemainingTickets'
	)
	const { data: currentWinningReward } = useContractData(
		contract,
		'CurrentWinningReward'
	)
	const { data: ticketPrice } = useContractData(contract, 'ticketPrice')

	const { data: ticketCommission } = useContractData(
		contract,
		'ticketCommission'
	)

	const { data: tickets } = useContractData(contract, 'getTickets')

	const { mutateAsync: BuyTickets } = useContractCall(contract, 'BuyTickets')

	const { data: winnings } = useContractData(
		contract,
		'getWinningsForAddress',
		address
	)

	const { mutateAsync: WithdrawWinnings } = useContractCall(
		contract,
		'WithdrawWinnings'
	)

	const { data: lastWinner } = useContractData(contract, 'lastWinner')
	const { data: lastWinnerAmount } = useContractData(
		contract,
		'lastWinnerAmount'
	)

	useEffect(() => {
		if (!tickets) return
		const totalTickets: string[] = tickets
		const noOfUserTickets = totalTickets.reduce(
			(total, ticketAddress) => (ticketAddress === address ? total + 1 : total),
			0
		)
		setUserTickets(noOfUserTickets)
	}, [tickets, address])

	const handleClick = async () => {
		if (!ticketPrice) return
		const notification = toast.loading('Buying your tickets...')
		try {
			const data = await BuyTickets([
				{
					value: ethers.utils.parseEther(
						(
							Number(ethers.utils.formatEther(ticketPrice)) * quantity
						).toString()
					),
				},
			])
			toast.success('Tickets bought successfully!', {
				id: notification,
			})
			console.info('contract call success', data)
		} catch (error) {
			toast.error('Whoops something went wrong', {
				id: notification,
			})
			console.log('contract call failure', error)
		}
	}

	const onWithDrawWinnings = async () => {
		const notification = toast.loading('Withdrawing winnings...')

		try {
			const data = await WithdrawWinnings([{}])
			toast.success('Winnings withdrawn successfully!', {
				id: notification,
			})
			console.info('contract call success', data)
		} catch (error) {
			toast.error('Whoops something went wrong!', {
				id: notification,
			})
			console.error('contract call failure', error)
		}
	}

	if (isLoading) return <Loading title="Loading all drawings" />
	return (
		<>
			<Marquee className="" gradient={false} speed={100}>
				<div className="flex space-x-2 mx-10 text-yellow-500 font-semibold">
					<h4>
						Last Winner:{' '}
						<span className="font-normal text-white">
							{lastWinner?.toString()}
						</span>
					</h4>
					<h4>
						Previous winnings:{' '}
						<span className="font-normal text-white">
							{lastWinnerAmount &&
								ethers.utils.formatEther(lastWinnerAmount?.toString())}{' '}
							{currency}
						</span>
					</h4>
				</div>
			</Marquee>
			{winnings > 0 && (
				<div className="max-w-md md-max-w-2xl lg:max-w-4xl mx-auto mt-5">
					<button
						onClick={onWithDrawWinnings}
						className="p-5 bg-yellow-500 text-stone-800 animate-pulse text-center rounded-xl w-full">
						<p className="font-bold">Winner Winner Chicken Dinner!</p>
						<p>
							Total Winnings: {ethers.utils.formatEther(winnings.toString())}{' '}
							{currency}
						</p>
						<p className="font-semibold mt-4">Click here to withdraw</p>
					</button>
				</div>
			)}
			<div className="space-y-5 md:space-y-0 m-5 md:flex md:flex-row items-start justify-center md:space-x-5 ">
				<div className="p-5 rounded-lg bg-stone-800 border-stone-600 border-2">
					<h1 className="text-5xl text-white font-semibold text-center mb-2">
						The Next Draw
					</h1>
					<div className="flex justify-between p-2 space-x-2">
						<div className="text-white p-4 rounded-md border-2 border-stone-700 bg-stone-900">
							<h2 className="text-sm">Total Pool</h2>
							<p className="text-xl">
								{currentWinningReward &&
									ethers.utils.formatEther(
										currentWinningReward.toString()
									)}{' '}
								{currency}
							</p>
						</div>
						<div className="text-white p-4  rounded-md border-2 border-stone-700 bg-stone-900">
							<h2 className="text-sm">Total Remaining</h2>
							<p className="text-xl">{remainingTickets?.toNumber()} TICKETS</p>
						</div>
					</div>
					<CountdownTimer />
				</div>
				<div className="p-5 rounded-lg bg-stone-800 border-stone-600 border-2 space-y-2">
					<div className="p-5 rounded-lg bg-stone-800 border-stone-500 border">
						<div className="flex justify-between items-center text-white pb-2">
							<h2>Price per ticket</h2>
							<p className="text-xl">
								{ticketPrice &&
									ethers.utils.formatEther(ticketPrice.toString())}{' '}
								{currency}
							</p>
						</div>
						<div className="flex text-white items-center space-2 bg-stone-900 border-stone-700 border p-4">
							<p>TICKETS</p>
							<input
								className="flex w-full bg-transparent text-right outline-none"
								type="number"
								min={1}
								max={10}
								value={quantity}
								onChange={e => setQuantity(Number(e.target.value))}
							/>
						</div>
						<div className="space-y-2 mt-5">
							<div className="flex items-center justify-between text-stone-500 text-sm italic font-extrabold">
								<p>Total cost of tickets</p>
								<p>
									{ticketPrice &&
										Number(ethers.utils.formatEther(ticketPrice?.toString())) *
											quantity}{' '}
									{currency}
								</p>
							</div>
							<div className="flex items-center justify-between text-stone-500 text-xs italic">
								<p>Service fees</p>
								<p>
									{ticketCommission &&
										ethers.utils.formatEther(ticketCommission?.toString())}{' '}
									{currency}
								</p>
							</div>
							<div className="flex items-center justify-between text-stone-500 text-xs italic">
								<p>+ Network fees</p>
								<p>TBC</p>
							</div>
						</div>
						<NavButton
							isActive
							onClick={handleClick}
							isDisabled={
								expiration?.toString() < Date.now().toString() ||
								remainingTickets?.toNumber() === 0
							}
							width="w-full"
							title={`Buy	${quantity} tickets for ${
								ticketPrice &&
								Number(ethers.utils.formatEther(ticketPrice?.toString())) *
									quantity
							} ${currency}`}
						/>
					</div>
					{userTickets > 0 && (
						<div>
							<p className="text-center text-sm my-2">
								Yoa have {userTickets} Tickets in this draw
							</p>
							<div className="flex max-w-sm flex-wrap gap-x-2 gap-y-2 ">
								{Array(userTickets)
									.fill('')
									.map((_, i) => (
										<p
											key={i}
											className="h-20 w-12 bg-yellow-500 text-stone-900 rounded-lg flex flex-shrink-0 items-center justify-center text-xs italic">
											{i + 1}
										</p>
									))}
							</div>
						</div>
					)}
				</div>
			</div>
		</>
	)
}
