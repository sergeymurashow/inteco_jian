export function numberTemplater(positions: number, num: number) {
	let template = ''
		for (let i = 0; i < positions; ++i) {
			template += '0'
		}
		const templated = `${template}${num.toString()}`
		return templated
}

export class Counter {
	positions: number
	count: number
	constructor(positions: number = 3, count: number = 1) {
		this.count = count
		this.positions = positions - this.count.toString().length
	}
	getNumber() {
		const result = numberTemplater( this.positions, this.count )
		++this.count
		return result
	}
}

let t = numberTemplater( 3, 99)


let w

