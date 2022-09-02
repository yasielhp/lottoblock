import { Menu, Transition } from '@headlessui/react'
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import {
	useAddress,
	useContract,
	useContractData,
	useDisconnect,
} from '@thirdweb-dev/react'
import Link from 'next/link'
import { CustomButton } from './CustomButton'

export const NavBar = () => {
	const address = useAddress()
	const disconnect = useDisconnect()
	const { contract, isLoading } = useContract(
		process.env.NEXT_PUBLIC_LOTTERY_CONTRACT_ADDRESS
	)

	const { data: isLotteryOperator } = useContractData(
		contract,
		'lotteryOperator'
	)

	const addressSeed = jsNumberForAddress(address!)
	return (
		<Menu
			as="div"
			className="bg-stone-800 flex flex-col justify-between items-center p-2 rounded-lg z-50">
			<Menu.Button className="flex">
				<div className="flex space-x-2 justify-center items-center">
					<Jazzicon diameter={40} seed={addressSeed} />
					<p>
						{address?.substring(0, 5)}...
						{address?.substring(address.length, address.length - 5)}
					</p>
				</div>
				<div className="flex justify-center items-center">
					<ChevronDownIcon className="h-4 mt-3 ml-2" />
				</div>
			</Menu.Button>

			<Transition
				enter="transition ease-out duration-100"
				enterFrom="transform opacity-0 scale-95"
				enterTo="transform opacity-100 scale-100"
				leave="transition ease-in duration-75"
				leaveFrom="transform opacity-100 scale-100"
				leaveTo="transform opacity-0 scale-95">
				<Menu.Items className="absolute right-[-96px] mt-4 w-[190px] origin-top-right divide-y divide-white rounded-md bg-stone-800">
					<div className="px-1 py-1 flex flex-col items-center justify-center">
						<Menu.Item
							as="div"
							className="text-white w-full flex items-center rounded-md px-2 py-2 hover:bg-stone-800 hover:text-stone-400 cursor-pointer">
							<Link href="/">Buy Ticket</Link>
						</Menu.Item>
						{isLotteryOperator === address && (
							<Menu.Item
								as="div"
								className="text-white w-full flex items-center rounded-md px-2 py-2 hover:bg-stone-800 hover:text-stone-400 cursor-pointer">
								<Link href="/admin">Admin Panel</Link>
							</Menu.Item>
						)}
						<Menu.Item as="div" className="">
							<CustomButton
								width="w-[170px]"
								isActive
								onClick={disconnect}
								title="Disconnect"
							/>
						</Menu.Item>
					</div>
				</Menu.Items>
			</Transition>
		</Menu>
	)
}
