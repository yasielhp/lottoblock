import {
	useContract,
	useMetamask,
	useDisconnect,
	useAddress,
	useContractData,
	useContractCall,
} from '@thirdweb-dev/react'
import type { NextPage } from 'next'
import { Draw, Layout, Modal } from '../components'

export const Home: NextPage = () => {
	const address = useAddress()
	const connectWithMetaMask = useMetamask()

	return (
		<Layout>
			{!address ? (
				<Modal
					text="Get started by logging in with your metamask to view this content"
					onClick={connectWithMetaMask}
				/>
			) : (
				<Draw />
			)}
		</Layout>
	)
}

export default Home