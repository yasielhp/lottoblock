import {
	useContract,
	useMetamask,
	useDisconnect,
	useAddress,
	useContractData,
	useContractCall,
} from '@thirdweb-dev/react'
import type { NextPage } from 'next'
import { Layout, Modal, Admin } from '../components'

export const AdminPage: NextPage = () => {
	const address = useAddress()
	const connectWithMetaMask = useMetamask()
	const { contract, isLoading } = useContract(
		process.env.NEXT_PUBLIC_LOTTERY_CONTRACT_ADDRESS
	)
	const { data: isLotteryOperator } = useContractData(
		contract,
		'lotteryOperator'
	)

	return (
		<Layout>
			{!address ? (
				<Modal
					text="Get started by logging in with your metamask to view this content"
					onClick={connectWithMetaMask}
				/>
			) : (
				<Admin />
			)}
		</Layout>
	)
}

export default AdminPage
