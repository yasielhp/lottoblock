import Head from 'next/head'
import { Header } from './Header'

interface Props {
	children: React.ReactNode
}

export const Layout = ({ children }: Props) => {
	return (
		<div>
			<Head>
				<title>RAFFLEBLOCK | Raffle Dapp</title>
				<link rel="icon" href="/favicon.svg" />
			</Head>
			<Header />
			<main className="flex flex-col justify-center items-center p-3 md:p-5 md:mx-8">
				{children}
			</main>
		</div>
	)
}
