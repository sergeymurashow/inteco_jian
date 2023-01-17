import _ from 'lodash'
import Counter from './Counter'
import dayjs, { Dayjs } from 'dayjs'
import toObject from 'dayjs/plugin/toObject'
import objectSupport from 'dayjs/plugin/objectSupport'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import utc from 'dayjs/plugin/utc'
import DocumentsParser from "./DocumentsParser"
import { Booking, matrix, ParseError, Container } from '../types/types'
import FindTableTitle from './FindTableTitle'

import utils from '../utils'

import * as prettyData from './prettyData'
import { Headers } from './things/types'

//* For Test
// import Path from 'path'
// import fs from 'fs'
// import { Console } from 'console'

// let path = Path.resolve('src', 'DocsParse', 'testData').toString()
// let file = Path.resolve(path, '2699', 'XIAN LIAN CHANG I26Q99.xlsx').toString()
//*
export default interface ReportParser {
	table: Headers.Contract[]
	startIndex: number
}

export default class ReportParser extends DocumentsParser {
	constructor(params) {
		super(params)
		const renamedTable = new FindTableTitle(this.bigSheet, 'contract').getTable()
		this.table = renamedTable.table
		this.startIndex = renamedTable.startIndex
	}
	get parsed(): (Booking | ParseError)[] {
		const collect = this.table
			.filter(f => {
				try {
					return f.BOOKINGNO && f.BOOKINGNO.toString().match(/(INT|INJIAN)\d+/) as Headers.Contract
				} catch (e) {
					console.error( e )
					console.log( f )
				}
			})
			.map(m => {
				let parsedBooking
				try {
					parsedBooking = getBooking(m)
				} catch ( e ) {
					console.error( e )
					console.error( m )
					parsedBooking = [{bookingId: null}]
				}
				return parsedBooking
			})
			.filter(f => {
				return f.bookingId
			})
		return _.sortBy(collect, 'bookingId')
	}
}

// let t = new ReportParser(file).parsed



function getBooking(data: Headers.Contract): Booking | ParseError {
	let result = (() => {
		return {
			bookingId: utils.clearString(data.BOOKINGNO),
			applicationDate: makeDate(utils.clearString(data.DATE)),
			contract: prettyData.contract(data.SC),
			voyageNumber: utils.fixVoyageNumber(data.VESSEL),
			containersCount: +utils.clearString(data.NUMBEROFCONTAINER),
			type: utils.clearString(data.TYPE),
			gWeight: prettyData.gWeight(data.GROSSWEIGHT),
			shipper: utils.clearString(data.SHIPPER),
			port: utils.clearString(data.POL),
			freight: utils.clearString(data.FREIGHTTERM),
			owner: utils.clearString(data.SOCCOC),
			docType: 'contract',
			containers: containersParse(data)
		}
	})()
	try {
		return result
	} catch (e) {
		console.group('Error')
		console.error(e)
		console.error(data)
		console.groupEnd()
		throw { bookingId: data.BOOKINGNO, errorMsg: JSON.stringify(data, null, 1) }
	}
}

function containersParse(data: Headers.Contract) {
	const chkMultiTypesReg = /(20|40)/g
	const chkMultiTypes = data.TYPE.match(chkMultiTypesReg).length === 1 ? false : true
	if (!chkMultiTypes) return containersGenerate({
		count: data.NUMBEROFCONTAINER,
		type: data.TYPE,
		freight: data.FREIGHTTERM,
		owner: data.SOCCOC
	})
	else {
		const typesReg = /(\d)+[*Xx](20|40)\w+/g
		const types = data.TYPE.match(typesReg)
		const mapped = types.map(m => {
			let ansArr = []
			const typeReg = /(?<count>\d+).*?(?<type>(20|40)\w+)/
			let parsedType = m.match(typeReg)
			if (parsedType.groups) {
				Object.assign(parsedType.groups, { freight: data.FREIGHTTERM }, { owner: data.SOCCOC })
				let req = parsedType.groups
				ansArr = ansArr.concat(containersGenerate(req))
			}
			return ansArr
		})
		return _.flatten(mapped)
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

// function makeDate(chinaDate: string): string {
// 	let [day, month] = chinaDate.match(/\d+/g)
// 	month = (+month - 1).toString()
// 	dayjs.extend(toObject)
// 	dayjs.extend(objectSupport)
// 	dayjs.extend(utc)
// 	let thisDate = dayjs().toObject()
// 	let bookingYear = thisDate.years
// 	let calc = +month - +thisDate.months
// 	if (calc > 10) {
// 		bookingYear = +bookingYear - 1
// 	}
// 	let dateObject = { years: bookingYear, months: month, date: day, hour: 21, minute: 0, second: 0, millisecond: 0 }
// 	return dayjs().set(dateObject).utc().toISOString()
// }

function makeDate(chinaDate: string): string {
	dayjs.extend(customParseFormat)
	dayjs.extend(utc)
	const dateFormat = ( cd ) => {
		if( /(\d{1,2}\.*){3}$/.test(cd) ) return 'M.D.YY'
		if( /\d{4}\/\d{1,2}\/\d{1,2}/.test(cd) ) return 'YYYY/MM/DD'
		if( /\d{2}\/\d{1,2}\/\d{1,2}/.test(cd) ) return 'DD/MM/YY'
	}
	let fixedDate = dayjs((chinaDate), dateFormat(chinaDate)).format('YYYY-MM-DDT00:00:00')
	return fixedDate
}


