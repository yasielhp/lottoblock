import { useContract, useContractCall } from '@thirdweb-dev/react'
import { useMyContractData } from './'
import { ethers } from 'ethers'
import toast from 'react-hot-toast'
import { useState } from 'react'

export const useMyContractCall = () => {
	const { contract, isLoading } = useContract(
		process.env.NEXT_PUBLIC_LOTTERY_CONTRACT_ADDRESS
	)
	const [quantity, setQuantity] = useState<number>(1)
	const { ticketPrice } = useMyContractData()
	const { mutateAsync: BuyTickets } = useContractCall(contract, 'BuyTickets')
	const { mutateAsync: WithdrawWinnings } = useContractCall(
		contract,
		'WithdrawWinnings'
	)
	const { mutateAsync: DrawWinnerTicket } = useContractCall(
		contract,
		'DrawWinnerTicket'
	)

	const { mutateAsync: RefundAll } = useContractCall(contract, 'RefundAll')

	const { mutateAsync: restartDraw } = useContractCall(contract, 'restartDraw')

	const { mutateAsync: WithdrawCommission } = useContractCall(
		contract,
		'WithdrawCommission'
	)
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
	const drawWinner = async () => {
		const notification = toast.loading('Picking a Lucky Winner...')

		try {
			const data = await DrawWinnerTicket([{}])
			toast.success('A Winner has been selected!', {
				id: notification,
			})
			console.info('contract call success', data)
		} catch (error) {
			toast.error('Something went wrong!', {
				id: notification,
			})
			console.error('contract call error', error)
		}
	}

	const onWithdrawCommission = async () => {
		const notification = toast.loading('Withdrawing Commission...')

		try {
			const data = await WithdrawCommission([{}])
			toast.success('Commission has been withdrawn!', {
				id: notification,
			})
			console.info('contract call success', data)
		} catch (error) {
			toast.error('Something went wrong!', {
				id: notification,
			})
			console.error('contract call error', error)
		}
	}

	const onRestartDraw = async () => {
		const notification = toast.loading('Restarting Draw...')
		try {
			const data = await restartDraw([{}])
			toast.success('Draw restarted successfully!', {
				id: notification,
			})
			console.info('contract call success', data)
		} catch (error) {
			toast.error('Something went wrong!', {
				id: notification,
			})
			console.error('contract call error', error)
		}
	}

	const onRefundAll = async () => {
		const notification = toast.loading('Refunding all...')
		try {
			const data = await RefundAll([{}])
			toast.success('All Refunded successfully!', {
				id: notification,
			})
			console.info('contract call success', data)
		} catch (error) {
			toast.error('Something went wrong!', {
				id: notification,
			})
			console.error('contract call error', error)
		}
	}
	return {
		quantity,
		setQuantity,
		contract,
		isLoading,
		handleClick,
		onWithDrawWinnings,
		DrawWinnerTicket,
		RefundAll,
		restartDraw,
		WithdrawCommission,
		drawWinner,
		onWithdrawCommission,
		onRestartDraw,
		onRefundAll,
	}
}
