import _ from 'lodash'


import DocumentsParser from "./DocumentsParser"
import { Booking, Container, matrix, ParseError } from '../types/types'

//* For Test
// import Path from 'path'
// import fs from 'fs'

// let path = Path.resolve('src', 'DocsParse', 'refactor', 'testData').toString()
// let file = Path.resolve(path, 'MANIFEST.xls').toString()
//*

export default class ManifestParser extends DocumentsParser {
	constructor(params) {
		super(params)
	}
	get parsed() {
		let voyage = this.fixVoyageNumber(this.bigSheet[1].C)

		let collect = {}
		let tmp: string
		this.bigSheet.forEach(fo => {
			let chk = fo.B && fo.B.match(/INJIAN/)
			if (chk) {
				tmp = fo.B
				collect[tmp] = getBooking(fo, voyage)
			} else if (tmp && fo.O) {
				if (fo.B) collect[tmp].hs = fo.B
				collect[tmp]['containers'].push(
					getContainer(fo)
				)
			}
		});
		collect = _.toArray(collect)
		return _.sortBy(collect, 'bookingId')
	}
}

function getBooking(data: matrix, voyageNumber: string): Booking | ParseError {
	try {
		data.L = data.L.toString().replace(/[^\d]/g, '')
	} catch (e) {
		console.error(e)
	}
	let result = () => {
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
			isManifest: [1],
			docType: 'manifest',
			containers: [
				getContainer(data)
			]
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

function getContainer(data: matrix): Container {
	try {
		data.K = data.K.toString().replace(/[^\d]/g, '')
	} catch (e) {
		console.log(typeof data.K)
	}
	let resp
	try {
		resp = {
			vol: data.N,
			number: data.O,
			seal: data.P,
			packages: data.Q,
			gWeight: data.R,
			tWeight: data.S,
			cbm: data.T,
			freight: data.U,
			owner: data.V ? data.V.replace(/\t+/g, '') : data.V,
			type: data.L.toString().replace(/[^\d]/g, '') + data.M.replace(/[^a-zA-Z]/g, '')
		}
	} catch (e) {
		console.log(e)
	}
	return resp
}


