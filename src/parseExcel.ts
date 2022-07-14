import path from 'path'
import fs from 'fs'
import _ from 'lodash'
import {sendParsed} from '../src/callback'

import xls from 'xlsx'

/*TODO 
— Create object structure
— Group values by booking ID
*/

const filesDir = path.resolve('files')
const file = path.resolve(filesDir, 'manifest.xls')
// const fileBody = fs.readFileSync(file, 'utf-8')

type Obj = {
	[key: string | number]: any
	set?(data: Obj): void
	get?(): any
}

type Params = {
	fileName: string
}

type Booking = {
	bookingId: string,
	voyageNumber: string,
	pkgs: string,
	packType: string,
	gWeight: string,
	desc: string,
	shipper: string,
	consignee: string,
	notifyParty: string,
	mark: string,
	hs: string | null,
	containers: Array<Container>
}

type Container = {
	mension: string,
	type: string,
	vol: string,
	number: string,
	seal: string,
	packages: string,
	gWeight: string,
	tWeight: string,
	cbm: string,
	freight: string,
	owner: string
}

export function manifestParser(params: Params) {
	
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

	let sheet = xls.readFile(params.fileName).Sheets['Sheet1']

	function getAddr(key: string) {
		return {
			col: key.match(/[A-Z]*/)[0],
			row: key.match(/\d+/)[0]
		}
	}

	for (let i in sheet) {
		if (!i.includes('!')) {
			obj.set({ [i]: sheet[i] })
		}
	}

	let arrayData: Array<Obj> = obj.get()

	let collect = {}

	function getContainer(data: Obj): Container {
		return {
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
			hs: null,
			containers: [
				getContainer(data)
			]
		}
	}

	let voyage: string = arrayData[2].C.match(/INT\d+/)[0]

	let tmp: string
	arrayData.forEach(fo => {
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
	collect = _.toArray( collect )
	sendParsed( 'manifest', collect )
	console.log( collect )
	return collect
}
