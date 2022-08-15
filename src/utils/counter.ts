// let count = 1
// export function counter(positions: number = 3) {
// 	let strNumber = count.toString()
// 	positions = positions - strNumber.length
// 	let template = ''
// 	for (let i = 0; i < positions; ++i) {
// 		template += '0'
// 	}
// 	++count
// 	return template + strNumber
// }

export class Counter {
	positions: number
	count: number
	constructor(positions: number = 3) {
		this.count = 0
		this.positions = positions - this.count.toString().length
	}
	getNumber() {
		let template = ''
		for (let i = 0; i < this.positions; ++i) {
			template += '0'
		}
		++this.count
		return template + this.count.toString()
	}
}