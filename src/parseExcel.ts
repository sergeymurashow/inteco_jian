import path from 'path'
import fs from 'fs'
import _ from 'lodash'
import { sendParsed } from './callbacks/callbackParsedDocs'

import xls from 'xlsx'
import { readFile } from 'xlsx'
import { Booking, Contract, Obj, Container, Params } from './types'
import { mergeSheets } from './utils/merge'
import { transcribeContractNumber } from './utils/transcribeContractNumber'

/*TODO 
— Create object structure
— Group values by booking ID
*/

const filesDir = path.resolve('files', 'new')
const file = path.resolve(filesDir, 'MANIFEST_one.xls')
// const fileBody = fs.readFileSync(file, 'utf-8')

// let t = manifestParser( {fileName: file} )


function getAddr(key: string) {
	return {
		col: key.match(/[A-Z]*/)[0],
		row: key.match(/\d+/)[0]
	}
}

function getContainer(data: Obj): Container {
	try {
		data.K = data.K.toString().replace(/[^\d]/g, '')
		} catch( e ) {
			console.log( typeof data.K )
		}
	const resp = {
		vol: data.M,
		number: data.N,
		seal: data.O,
		packages: data.P,
		gWeight: data.Q,
		tWeight: data.R,
		cbm: data.S,
		freight: data.T,
		owner: data.U ? data.U.replace(/\t+/g, '') : data.U,
		type: data.K + data.L
	}
	return resp
}

function getBooking(data: Obj, voyageNumber: string): Booking {
	try {
	data.K = data.K.toString().replace(/[^\d]/g, '')
	} catch( e ) {
		console.log( typeof data.K )
	}
	return {
		bookingId: data.A,
		voyageNumber: voyageNumber,
		pkgs: data.B,
		packType: data.C,
		gWeight: data.D,
		desc: data.E,
		shipper: data.F,
		consignee: data.G,
		notifyParty: data.H,
		mark: data.I,
		owner: data.U ? data.U.replace(/\t+/g, '') : data.U,
		type: data.K + data.L,
		hs: data.J ? data.J.replace(/\t+/g, '') : data.J,
		freight: data.T,
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


	let voyage: string = bigSheet[1].B.match(/INT\d+.*/)[0]

	let collect = {}
	let tmp: string
	bigSheet.forEach(fo => {
		let chk = fo.A && fo.A.match(/INJIAN/)
		if (chk) {
			tmp = fo.A
			collect[tmp] = getBooking(fo, voyage)
		} else if (tmp && fo.N) {
			if (fo.A) collect[tmp].hs = fo.A
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

function clearString(data: string | number ) {
	if( typeof data === 'number' ) return data
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

	let collect
	try {
		collect = bigSheet
			.filter(f => {
				return f.C && f.C.match(/INJIAN\d+/)
			})
			.map(m => {
				return { 
					bookingId: clearString(m.C), 
					contract: transcribeContractNumber(clearString(m.B).toString()), 
					voyageNumber: clearString(m.H.match(/INT\d+/)[0]),
					containersCount: +clearString(m.D),
					type: clearString(m.E),
					gWeight: clearString(m.F),
					shipper: clearString(m.G)
				}
			})
	} catch (err) {
		console.error(err)
	}

	// sendParsed(collect)
	console.log(collect)
	return collect
}



