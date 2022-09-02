import {
	useContract,
	useMetamask,
	useDisconnect,
	useAddress,
	useContractData,
	useContractCall,
} from '@thirdweb-dev/react'
import { Loading } from './Loading'
import {
	StarIcon,
	CurrencyDollarIcon,
	ArrowPathIcon,
	ArrowUturnDownIcon,
} from '@heroicons/react/24/solid'
import { ethers } from 'ethers'
import { currency } from '../constants'
import toast from 'react-hot-toast'

export const Admin = () => {
	const address = useAddress()
	const { contract, isLoading } = useContract(
		process.env.NEXT_PUBLIC_LOTTERY_CONTRACT_ADDRESS
	)
	const { data: isLotteryOperator } = useContractData(
		contract,
		'lotteryOperator'
	)
	const { data: totalCommission } = useContractData(
		contract,
		'operatorTotalCommission'
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

	if (isLoading) return <Loading title="Loading panel" />

	return (
		<>
			{isLotteryOperator === address ? (
				<div className="text-center px-5 py-3 rounded-md border-stone-700 border">
					<h2 className="font-bold">Admin Controls</h2>
					<p className="mb-5">
						Total commission to be withdrawn{' '}
						<span>
							{totalCommission &&
								ethers.utils.formatEther(totalCommission?.toString())}{' '}
							{currency}
						</span>
					</p>

					<div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
						<button
							onClick={drawWinner}
							className="bg-stone-800 p-2 flex-1 rounded-md border-stone-600 border-2 hover:bg-stone-700">
							<StarIcon className="h-6 mx-auto mb-2" />
							Raffle Winner
						</button>
						<button
							onClick={onWithdrawCommission}
							className="bg-stone-800 p-2 flex-1 rounded-md border-stone-600 border-2 hover:bg-stone-700">
							{' '}
							<CurrencyDollarIcon className="h-6 mx-auto mb-2" />
							Withdraw Commission
						</button>
						<button
							onClick={onRestartDraw}
							className="bg-stone-800 p-2 flex-1 rounded-md border-stone-600 border-2 hover:bg-stone-700">
							{' '}
							<ArrowPathIcon className="h-6 mx-auto mb-2" />
							Restart Raffle
						</button>
						<button
							onClick={onRefundAll}
							className="bg-stone-800 p-2 flex-1 rounded-md border-stone-600 border-2 hover:bg-stone-700">
							{' '}
							<ArrowUturnDownIcon className="h-6 mx-auto mb-2" />
							Refund All
						</button>
					</div>
				</div>
			) : (
				<p>You do not have access as a draw administrator</p>
			)}
		</>
	)
}

export default Admin
