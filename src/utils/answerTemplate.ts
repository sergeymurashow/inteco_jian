type Answer = {
	answer?: any
	code?: string
	err?: any
}

export default function answerTemplate ( data: Answer ) {
	const { answer, code, err } = data
	return { answer, code, err }
}

console.log( answerTemplate({answer: 'test'}))