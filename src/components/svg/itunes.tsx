import React from "react"

interface Props extends React.SVGProps<SVGSVGElement> {}

export default function ITunes({height=100, className, width=100, ...props }: Props) {
	return (
		<svg {...props} height={height} width={width} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
			<path
				d="M50 0C22.4 0 0 22.4 0 50s22.4 50 50 50 50-22.4 50-50S77.6 0 50 0zm0 90c-22.1 0-40-17.9-40-40s17.9-40 40-40 40 17.9 40 40-17.9 40-40 40z"
				className={className}
			/>
			<path
				d="M35 25c-2.8 0-5 2.2-5 5v40c0 2.8 2.2 5 5 5h30c2.8 0 5-2.2 5-5V30c0-2.8-2.2-5-5-5H35zm30 40H35V30h30v35z"
				className={className}
			/>
			<path
				d="M45 35c-2.8 0-5 2.2-5 5v20c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V40c0-2.8-2.2-5-5-5H45zm10 20H45V40h10v15z"
				className={className}
			/>
			<circle cx="50" cy="47.5" r="2.5" className={className} />
		</svg>
	)
} 