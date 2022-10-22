import numberTemplater from "../functions/numberTemplater"

export default class Counter {
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
