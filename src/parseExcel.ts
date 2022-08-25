import path from 'path'
import fs from 'fs'
import _ from 'lodash'
import { sendParsed } from './callbacks/callbackParsedDocs'

import xls from 'xlsx'
import { readFile } from 'xlsx'
import { Booking, Contract, Obj, Container, Params, record } from './types'
import { mergeSheets } from './utils/merge'
import { transcribeContractNumber } from './utils/transcribeContractNumber'
import fixVoyageNumber from './utils/fixVoyageNumber'

/*TODO 
— Create object structure
— Group values by booking ID
*/

const filesDir = path.resolve('files', 'new')
const file = path.resolve(filesDir, 'MANIFEST_one.xls')
// const fileBody = fs.readFileSync(file, 'utf-8')

// let t = manifestParser( {fileName: file} )

// console.log( JSON.stringify( t ))

function getAddr(key: string) {
	return {
		col: key.match(/[A-Z]*/)[0],
		row: key.match(/\d+/)[0]
	}
}

function getContainer(data: Obj): Container {
	try {
		data.K = data.K.toString().replace(/[^\d]/g, '')
	} catch (e) {
		console.log(typeof data.K)
	}
	const resp = {
		vol: data.N,
		number: data.O,
		seal: data.P,
		packages: data.Q,
		gWeight: data.R,
		tWeight: data.S,
		cbm: data.T,
		freight: data.U,
		owner: data.V ? data.V.replace(/\t+/g, '') : data.V,
		type: data.L + data.M
	}
	return resp
}

function getBooking(data: Obj, voyageNumber: Array<record>): Booking {
	try {
		data.L = data.L.toString().replace(/[^\d]/g, '')
	} catch (e) {
		console.log(typeof data.L)
	}
	return {
		bookingId: data.B,
		voyageNumber: voyageNumber,
		pkgs: data.C,
		packType: data.D,
		gWeight: data.E,
		desc: data.F,
		shipper: data.G,
		consignee: data.H,
		notifyParty: data.I,
		mark: data.J,
		owner: data.V ? data.V.replace(/[^a-zA-Z]/g, '') : data.V,
		type: data.L + data.M,
		hs: data.K ? data.K.replace(/\t+/g, '') : data.K,
		freight: data.U,
		containers: [
			getContainer(data)
		]
	}
}

function parseSheet(sheet) {
	let obj: Obj = {
		data: {},
		set(data: Obj) {
			const keys = getAddr(Object.keys(data)[0])
			const value = Object.values(data)[0]
			if (!this.data[keys.row]) this.data[keys.row] = {}
			this.data[keys.row][keys.col] = value.v
		},
		get(): Array<Obj> {
			return _.toArray(this.data)
		}
	}

	for (let i in sheet) {
		if (!i.includes('!')) {
			obj.set({ [i]: sheet[i] })
		}
	}

	let arrayData: Array<Obj> = obj.get()
	return arrayData
}

export function manifestParser(params: Params) {

	let sheet = xls.readFile(params.fileName).Sheets
	let parsedSheet = _.toArray(sheet).map(m => parseSheet(m))
	let bigSheet = [].concat(...parsedSheet)


	let voyage: Array<record> = params.voyage//fixVoyageNumber(bigSheet[1].B)

	let collect = {}
	let tmp: string
	bigSheet.forEach(fo => {
		let chk = fo.B && fo.B.match(/INJIAN/)
		if (chk) {
			tmp = fo.B
			collect[tmp] = getBooking(fo, voyage)
		} else if (tmp && fo.M) {
			if (fo.B) collect[tmp].hs = fo.B
			collect[tmp]['containers'].push(
				getContainer(fo)
			)
		}
	});
	collect = _.toArray(collect)
	// sendParsed(collect)
	console.log(collect)
	return collect
}

function clearString(data: string | number): string {
	if (!data) return null
	if (typeof data === 'number') return data.toString()
	try {
		if (!data) return
		return data.replace(/(^\s+|\s+$)/g, '')
	} catch (err) {
		console.error(err)
	}
}

export function contractAndBookingParser(params: Params) {

	let sheet = xls.readFile(params.fileName).Sheets
	let parsedSheet = _.toArray(sheet).map(m => parseSheet(m))
	let bigSheet = [].concat(...parsedSheet)

	let voyage: Array<record> = params.voyage//fixVoyageNumber(bigSheet[1].H)

	let collect
	collect = bigSheet
		.filter(f => {
			return f.C && f.C.match(/INJIAN\d+/)
		})
		.map(m => {
			let result = {
				bookingId: clearString(m.C),
				contract: transcribeContractNumber(clearString(m.B)).answer,
				voyageNumber: voyage,
				containersCount: +clearString(m.D),
				type: clearString(m.E),
				gWeight: clearString(m.F) ? clearString(m.F).replace(/,/, '.') : null,
				shipper: clearString(m.G)
			}
		if( result.bookingId == 'INJIAN00003419' ) {
			console.log( result )
		}
			return result
		})
	console.log(collect)
	return collect


	// sendParsed(collect)

}



