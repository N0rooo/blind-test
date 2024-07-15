'use client';

import { usePathname } from "next/navigation";

export default function Layout({
	children,
	auth,
}: Readonly<{
	children: React.ReactNode
	auth: React.ReactNode
}>) {


	return (
		<>
			{children}
			{auth}
		</>
	)
}
