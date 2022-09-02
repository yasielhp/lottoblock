import type { NextPage } from 'next'
import { Draw, Layout } from '../components'

export const Home: NextPage = () => {
	return (
		<Layout>
			<Draw />
		</Layout>
	)
}

export default Home
