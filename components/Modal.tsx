import { CustomButton } from './CustomButton'

interface Props {
	text: string
	isActive?: boolean
	onClick?: () => void
	titleButton?: string
}

export const Modal = ({ text, onClick, titleButton }: Props) => {
	return (
		<div className="flex bg-opacity-60 backdrop-blur-xl justify-center items-center w-screen h-full">
			<div className="z-10 absolute top-10 flex flex-col justify-center items-center bg-white drop-shadow-xl p-5 rounded-md">
				<p className="mb-4 w-72 text-center text-stone-800">{text}</p>
				<CustomButton isActive onClick={onClick} title={titleButton!} />
			</div>
		</div>
	)
}
