export default function numberTemplater(positions: number, num: number) {
	let template = ''
		for (let i = 0; i < positions; ++i) {
			template += '0'
		}
		const templated = `${template}${num.toString()}`
		return templated
}