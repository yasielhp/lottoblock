import { useState } from 'react'
import { XCircleIcon } from '@heroicons/react/24/solid'

export const Notification = () => {
	const [isOpen, setIsOpen] = useState(true)

	return (
		<>
			{isOpen && (
				<div className="bg-stone-700 flex items-center px-2 justify-between md:px-14 py-2">
					<p className="font-light text-sm text-stone-300">
						<a href="https://faucet.polygon.technology/" target="_blank">
							Get your wallet funded if you don't already have one and try out
							this Dapp...
						</a>
					</p>
					<button
						className="flex items-center justify-center"
						onClick={() => setIsOpen(!isOpen)}>
						<XCircleIcon className="h-6 mx-auto" />
					</button>
				</div>
			)}
		</>
	)
}
