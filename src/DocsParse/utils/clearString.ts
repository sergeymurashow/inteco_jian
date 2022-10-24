export default function clearString(data: string | number): string {
	if (!data) return null
	if (typeof data === 'number') return data.toString()
	try {
		if (!data) return
		return data.replace(/(^\s+|\s+$)/g, '')
	} catch (err) {
		console.error(err)
	}
}