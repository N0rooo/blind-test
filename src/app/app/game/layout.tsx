import React from "react"

export default function Layout({ children }: { children: React.ReactNode }) {
	return <div className="pt-[90px] h-full flex flex-col relative items-center p-6">{children}</div>
}
