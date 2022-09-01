import { MoonLoader } from 'react-spinners'

interface Props {
	title?: string
}

export const Loading = ({ title }: Props) => {
	return (
		<div className="flex flex-col justify-center items-center space-y-2 w-screen h-full">
			<MoonLoader color="white" size={20} />
			<p className="text-center mt-2 text-sm">{title}</p>
		</div>
	)
}
