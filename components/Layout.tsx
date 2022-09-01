import Head from 'next/head'
import { Header } from './Header'

interface Props {
	children: React.ReactNode
}

export const Layout = ({ children }: Props) => {
	return (
		<div>
			<Head>
				<title>LOTTOBLOCK | Lottery Dapp</title>
				<link rel="icon" href="/favicon.svg" />
			</Head>
			<Header />
			<main className="flex flex-col justify-center items-center px-5">
				{children}
			</main>
		</div>
	)
}
