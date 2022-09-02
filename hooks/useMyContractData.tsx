import { useAddress, useContract, useContractData } from '@thirdweb-dev/react'

export const useMyContractData = () => {
	const address = useAddress()
	const { contract } = useContract(
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
	const { data: lastWinner } = useContractData(contract, 'lastWinner')
	const { data: lastWinnerAmount } = useContractData(
		contract,
		'lastWinnerAmount'
	)

	const { data: tickets } = useContractData(contract, 'getTickets')

	const { data: winnings } = useContractData(
		contract,
		'getWinningsForAddress',
		address
	)
	const { data: isLotteryOperator } = useContractData(
		contract,
		'lotteryOperator'
	)
	const { data: totalCommission } = useContractData(
		contract,
		'operatorTotalCommission'
	)
	return {
		address,
		expiration,
		remainingTickets,
		currentWinningReward,
		ticketPrice,
		ticketCommission,
		lastWinner,
		lastWinnerAmount,
		tickets,
		winnings,
		isLotteryOperator,
		totalCommission,
	}
}
