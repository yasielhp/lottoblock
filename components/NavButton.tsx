interface Props {
	title: string
	width?: string
	isActive?: boolean
	isDisabled?: boolean
	onClick?: () => void
}

export const NavButton = ({
	title,
	width,
	isActive,
	isDisabled,
	onClick,
}: Props) => {
	return (
		<button
			onClick={onClick}
			disabled={isDisabled}
			className={`${
				isActive && 'bg-yellow-400 text-stone-800'
			} mx-0 font-bold h-10 px-5 m-2 hover:bg-yellow-500 hover:text-stone-800 rounded-md transition-colors duration-150 focus:shadow-outline disabled:bg-stone-700 disabled:cursor-not-allowed disabled:text-stone-800 ${width}`}>
			{title}
		</button>
	)
}
