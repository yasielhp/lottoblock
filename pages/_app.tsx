import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChainId, ThirdwebProvider } from '@thirdweb-dev/react'
import { Toaster } from 'react-hot-toast'

const activeChainId = ChainId.Mumbai

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ThirdwebProvider desiredChainId={activeChainId}>
			<Component {...pageProps} />
			<Toaster />
		</ThirdwebProvider>
	)
}

export default MyApp
