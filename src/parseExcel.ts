import path from 'path'
import fs from 'fs'
import _ from 'lodash'
import { sendParsed } from './callback'

import xls from 'xlsx'
import { readFile } from 'xlsx'
import { Booking, Contract, Obj, Container, Params } from './types'
import { mergeSheets } from './utils/merge'
import { transcribeContractNumber } from './utils/transcribeContractNumber'

/*TODO 
— Create object structure
— Group values by booking ID
*/

const filesDir = path.resolve('files')
const file = path.resolve(filesDir, 'INTECO Qingdao 6.20.xlsx')
// const fileBody = fs.readFileSync(file, 'utf-8')



function getAddr(key: string) {
	return {
		col: key.match(/[A-Z]*/)[0],
		row: key.match(/\d+/)[0]
	}
}

function getContainer(data: Obj): Container {
	const resp = {
		mension: data.L,
		type: data.M,
		vol: data.N,
		number: data.O,
		seal: data.P,
		packages: data.Q,
		gWeight: data.R,
		tWeight: data.T,
		cbm: data.U,
		freight: data.V,
		owner: data.W
	}
	return resp
}

function getBooking(data: Obj, voyageNumber: string): Booking {
	return {
		bookingId: data.A,
		voyageNumber: voyageNumber,
		pkgs: data.C,
		packType: data.D,
		gWeight: data.E,
		desc: data.G,
		shipper: data.H,
		consignee: data.I,
		notifyParty: data.J,
		mark: data.K,
		owner: data.W,
		type: data.L + data.M,
		hs: null,
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


	let voyage: string = bigSheet[2].C.match(/INT\d+/)[0]

	let collect = {}
	let tmp: string
	bigSheet.forEach(fo => {
		let chk = fo.A && fo.A.match(/INJIAN/)
		if (chk) {
			tmp = fo.A
			collect[tmp] = getBooking(fo, voyage)
		} else if (tmp && fo.L) {
			if (fo.A) collect[tmp].hs = fo.A
			collect[tmp]['containers'].push(
				getContainer(fo)
			)
		}
	});
	collect = _.toArray(collect)
	// sendParsed('manifest', collect)
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

	// sendParsed('contracts', collect)
	console.log(collect)
	return collect
}



