import {
	useAddress,
	useContract,
	useContractData,
	useDisconnect,
	useMetamask,
} from '@thirdweb-dev/react'
import Link from 'next/link'
import { NavButton } from './NavButton'

export const Header = () => {
	const address = useAddress()
	const connectWithMetaMask = useMetamask()
	const disconnect = useDisconnect()
	const { contract, isLoading } = useContract(
		process.env.NEXT_PUBLIC_LOTTERY_CONTRACT_ADDRESS
	)
	const { data: isLotteryOperator } = useContractData(
		contract,
		'lotteryOperator'
	)

	return (
		<header className="grid grid-cols-2 justify-between items-center p-5">
			<Link href="/">
				<div className="col-span-1 group">
					<p className="text-2xl select-none text-red-600 group-hover:text-red-700">
						LOTTO
						<span className="font-bold text-yellow-400 group-hover:text-yellow-500">
							BLOCK
						</span>
					</p>
				</div>
			</Link>
			<div className="space-x-4 flex justify-end items-center">
				<ul className="flex space-x-4">
					<li>
						<Link href="/">Buy Ticket</Link>
					</li>
					{isLotteryOperator === address && (
						<li>
							{' '}
							<Link href="/admin">Admin</Link>
						</li>
					)}
				</ul>
				{address ? (
					<NavButton isActive onClick={disconnect} title="Disconnect" />
				) : (
					<NavButton isActive onClick={connectWithMetaMask} title="Connect" />
				)}
			</div>
		</header>
	)
}
