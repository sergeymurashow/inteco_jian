

class ManifestContainError extends Error {
	groupName: string
	constructor(msg: string, groupName: string = 'Check error') {
		super(msg)
		this.groupName = groupName
		console.group(this.groupName)
		console.error(msg)
		console.groupEnd()


	}
}

function valueCheck( key, value ) {
	if( ! value ) throw new ManifestContainError(`Value of "${key}" is missing`)
}

export default function answerChecker<T>(data: T) {
	const keys = Object.keys(data)
	const values = Object.values(data)
	values.forEach((fo, fi) => {
		try {
			valueCheck( keys[fi], fo)
		} catch (e) {
			console.error( e )
		}
	})
}

