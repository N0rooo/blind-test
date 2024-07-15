'use client';
import React from "react"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog"

interface ConfirmActionProps {
  children: React.ReactNode
  title?: string
  description?: string
	action: () => void
}

export default function ConfirmAction({children, action, title="Are you absolutely sure?", description="This action cannot be undone. This will permanently delete your account and remove your data from our servers."}: ConfirmActionProps) {
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
        {children}
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>{title}</AlertDialogTitle>
					<AlertDialogDescription>{description}</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction onClick={action}>Continue</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
