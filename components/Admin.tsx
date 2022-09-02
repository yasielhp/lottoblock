import { useMyContractCall, useMyContractData } from '../hooks'
import { Loading } from './Loading'
import {
	StarIcon,
	CurrencyDollarIcon,
	ArrowPathIcon,
	ArrowUturnDownIcon,
} from '@heroicons/react/24/solid'
import { ethers } from 'ethers'
import { currency } from '../constants'

export const Admin = () => {
	const { address, isLotteryOperator, totalCommission } = useMyContractData()
	const {
		isLoading,
		drawWinner,
		onWithdrawCommission,
		onRestartDraw,
		onRefundAll,
	} = useMyContractCall()

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
