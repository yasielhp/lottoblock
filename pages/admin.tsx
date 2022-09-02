import type { NextPage } from 'next'
import { Layout, Admin } from '../components'

export const AdminPage: NextPage = () => {
	return (
		<Layout>
			<Admin />
		</Layout>
	)
}

export default AdminPage
