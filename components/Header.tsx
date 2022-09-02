import { useAddress, useMetamask } from '@thirdweb-dev/react'
import Link from 'next/link'
import { CustomButton, NavBar } from './'

export const Header = () => {
	const address = useAddress()
	const connectWithMetaMask = useMetamask()

	return (
		<header className="grid grid-cols-2 justify-between items-center p-3 md:p-5 md:mx-8">
			<Link href="/">
				<div className="col-span-1 group cursor-pointer">
					<p className="text-2xl select-none text-red-600 group-hover:text-red-700">
						RAFFLE
						<span className="font-bold text-yellow-400 group-hover:text-yellow-500">
							BLOCK
						</span>
					</p>
				</div>
			</Link>
			<div className="flex justify-end items-center">
				{address ? (
					<NavBar />
				) : (
					<CustomButton
						isActive
						onClick={connectWithMetaMask}
						title="Connect Metamask"
					/>
				)}
			</div>
		</header>
	)
}
