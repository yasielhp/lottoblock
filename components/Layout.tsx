import Head from 'next/head'
import { Header } from './Header'
import {
	useMetamask,
	useAddress,
	useNetwork,
	ChainId,
} from '@thirdweb-dev/react'
import { Modal, Notification } from './'

interface Props {
	children: React.ReactNode
}

export const Layout = ({ children }: Props) => {
	const address = useAddress()
	const connectWithMetaMask = useMetamask()
	const network = useNetwork()
	const [, switchNetwork] = useNetwork()
	const idNetwork = network?.[0].data.chain?.id
	return (
		<>
			<Head>
				<title>RAFFLEBLOCK | Raffle Dapp</title>
				<link rel="icon" href="/favicon.svg" />
			</Head>
			{!address ? (
				<main className="pt-60">
					<Modal
						text="Get started by logging in with your metamask to view this content."
						titleButton="Login with Metamask"
						onClick={connectWithMetaMask}
					/>
				</main>
			) : address && idNetwork !== 80001 ? (
				<main className="pt-60">
					<Modal
						text="Please switch to the test network to view this content."
						titleButton="Switch to Mumbai"
						onClick={() => switchNetwork!(ChainId.Mumbai)}
					/>
				</main>
			) : (
				<>
					<Notification />
					<Header />
					<main className="flex flex-col justify-center items-center p-3 md:p-5 md:mx-8">
						{children}
					</main>
				</>
			)}
		</>
	)
}
