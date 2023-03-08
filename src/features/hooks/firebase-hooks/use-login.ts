import { useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth"
import { useEffect } from "react"
import { auth } from '@firebase-config'
import { checkError } from "../utils/check-error"

export const useLogin = () => {
	let mounted = true
	const [error, setError] = useState<string | null>(null)
	const [isPending, setIsPending] = useState(false)

	const login = async (email: string, password: string) => {
		try {
			if (mounted) {
				setIsPending(true)
				setError(null)
			}
			await signInWithEmailAndPassword(auth, email, password)
			if (mounted) setIsPending(false); setError(null)

		} catch (error) {
			if (mounted) {
				const message = checkError(error)
				setError(message)
				setIsPending(false)
			}
		}
	}
	useEffect(() => {
		return () => { mounted = false }
	}, [])

	return { error, isPending, login }

}