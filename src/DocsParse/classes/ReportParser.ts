import _ from 'lodash'


import DocumentsParser from "./DocumentsParser"
import { Booking, matrix, ParseError, Container } from '../types/types'

import utils from '../utils'

//* For Test
// import Path from 'path'
// import fs from 'fs'
// import { Console } from 'console'

// let path = Path.resolve('src', 'DocsParse', 'refactor', 'testData').toString()
// let file = Path.resolve(path, 'REPORT_2.xlsx').toString()
//*


export default class ReportParser extends DocumentsParser {
	constructor(params) {
		super(params)
	}
	get parsed(): (Booking | ParseError)[] {
		const collect = this.bigSheet
			.filter(f => {
				try {
					return f.C && f.C.toString().match(/INJIAN\d+/)
				} catch (e) {
					console.log(f)
				}
			})
			.map(m => getBooking(m))
			.filter(f => f.bookingId)
			console.log(collect)
		return _.sortBy(collect, 'bookingId')
	}
}

// let t = new ReportParser( file ).parsed

function getBooking(data: matrix): Booking | ParseError {
	let result = () => {
		return {
			bookingId: utils.clearString(data.C),
			contract: utils.transcribeContractNumber(utils.clearString(data.B)).answer,
			voyageNumber: utils.fixVoyageNumber(data.H),
			containersCount: +utils.clearString(data.D),
			type: utils.clearString(data.E),
			gWeight: utils.clearString(data.F) ? utils.clearString(data.F).replace(/,/, '.') : null,
			shipper: utils.clearString(data.G),
			port: utils.clearString(data.J),
			freight: utils.clearString(data.L),
			owner: utils.clearString(data.K),
			docType: 'contract',
			containers: containersParse( data )
		}
	}
	try {
		return result()
	} catch (e) {
		console.group('Error')
		console.error(e)
		console.error(data)
		console.groupEnd()
		return { bookingId: null, errorMsg: JSON.stringify(data, null, 1) }
	}
}

function containersParse(data: matrix) {
	const chkMultiTypesReg = /(20|40)/g
	const chkMultiTypes = data.E.match(chkMultiTypesReg).length
	if (chkMultiTypes === 1) return containersGenerate({
		count: data.D,
		type: data.E,
		freight: data.L,
		owner: data.K
	})
	else {
		const typesReg = /(\d)+[*Xx](20|40)\w+/g
		const types = data.E.match(typesReg)
		const mapped = types.map(m => {
			let ansArr = []
			const typeReg = /(?<count>\d+).*?(?<type>(20|40)\w+)/
			let parsedType = m.match(typeReg)
			if (parsedType.groups) {
				Object.assign(parsedType.groups, { freight: data.L }, { owner: data.K })
				let req = parsedType.groups
				ansArr = ansArr.concat(containersGenerate(req))
			}
			return ansArr
		})
		return _.flatten( mapped )
	}
}

function getContainer(data: matrix): Container {
	// try {
	// 	data.E = data.E.toString().replace(/[^\d]/g, '')
	// } catch (e) {
	// 	console.log(typeof data.E)
	// }
	let resp
	try {
		resp = {
			number: 'reported',
			freight: data.freight,
			owner: data.owner,
			type: data.type
		}
	} catch (e) {
		console.log(e)
	}
	return resp
}

function containersGenerate({ count, type, freight, owner }) {
	const resp = []
	for (let i = 1; i <= count; i++) {
		resp.push(getContainer({
			type,
			freight,
			owner
		}))
	}
	return resp
}


