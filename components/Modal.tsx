import { NavButton } from './NavButton'

interface Props {
	text: string
	isActive?: boolean
	onClick?: () => void
}

export const Modal = ({ text, onClick }: Props) => {
	return (
		<div className="flex bg-opacity-60 backdrop-blur-xl justify-center items-center w-screen h-full">
			<div className="z-10 absolute top-10 flex flex-col justify-center items-center bg-white drop-shadow-xl p-5 rounded-md">
				<p className="mb-4 w-72 text-center text-mirage">{text}</p>
				<NavButton isActive onClick={onClick} title="Login with Metamask" />
			</div>
		</div>
	)
}
