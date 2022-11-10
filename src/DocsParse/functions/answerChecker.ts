

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

export default function answerChecker<T>(data: T) {
	const keys = Object.keys(data)
	const values = Object.values(data)
	values.forEach((fo, fi) => {
		try {
			if (!fo) {
				throw new ManifestContainError(`${keys[fi]} is missing`)
			}
		} catch (e) {
			console.error( e )
		}
	})
}

answerChecker({ key: 'val', key2: null, key3: 'val3' })
