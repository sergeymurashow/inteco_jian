type Answer = {
	answer?: any
	code?: string
	err?: string
}

export default function ( data: Answer ) {
	const { answer, code, err } = data
	return { answer, code, err }
}