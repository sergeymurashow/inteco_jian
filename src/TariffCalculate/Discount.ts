import { Obj } from "src/types/types";
// import { contractData } from "./testData/contractData";

const discountValues = {
	socCoc: {
		'1': 'SOC',
		'2': 'COC'
	},
	type: {
		'1': '20',
		'2': '40'
	},
	direction: {
		'1': 'IMPORT',
		'2': 'EXPORT'
	}
}

type DiscountValuesKeys = 'socCoc' | 'type' | 'direction'

export interface DiscountParse {
	port: string[]
	direction: string[]
	discount: number
	socCoc: string[]
	type: string[]
}

export class DiscountParse {
	constructor({ socCoc, port, direction, type, discount }) {
		this.socCoc = socCoc
		this.type = type
		this.discount = discount
		this.port = port
		this.direction = direction
	}
}


function getnames(option: string[], key: DiscountValuesKeys): Obj[] {
	return option.map(m => discountValues[key][m])
}


export interface Discount {
	discountFields: Array<Obj>
	parsedFields: Array<DiscountParse>
}

export class Discount {
	constructor(discountFields) {
		this.discountFields = discountFields
		this.parsedFields = this.discountFields.length ?
			this.parser(this.discountFields) :
			null
	}

	private parser(discountFields): Array<DiscountParse> {
		return discountFields.map(m => {
			let { recordValues } = m
			return new DiscountParse({
				socCoc: recordValues[6],
				port: recordValues[3].map(m => m.recordTitle),
				direction: recordValues[11],
				type: recordValues[5],
				discount: recordValues[1]
			})
		})
	}

	private getFromArray(array: string[], value: string) {
		let chk = array.length ? array.includes(value) : true
		return chk
	}

	find({ port, direction, socCoc, type }) {
		if (!this.parsedFields) return { discount: 0 }
		const findedDiscount = this.parsedFields.find(fi => {
			let chk =
				this.getFromArray(fi.port, port) &&
				this.getFromArray(fi.direction, direction) &&
				this.getFromArray(fi.socCoc, socCoc) &&
				this.getFromArray(fi.type, type)
			return chk
		})
		return findedDiscount ? findedDiscount : { discount: 0 }
	}
}




// let t = new Discount([])

// let p = t.parsedFields

// let q = t.find({
// 	port: 'QINGDAO',
// 	socCoc: 'SOC',
// 	direction: 'IMPORT',
// 	type: '20'
// })





