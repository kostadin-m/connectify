export const checkError = (error: any) => {
	let message = 'Unknown Error'
	if (error instanceof Error) message = error.message
	return message
}