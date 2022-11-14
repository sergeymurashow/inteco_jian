import _ from 'lodash'


import DocumentsParser from "./DocumentsParser"
import { Booking, Container, matrix, ParseError } from '../types/types'
import FindTableTitle from './FindTableTitle'
import { Headers } from './things/types'
import manifestGetVoyagePort from '../functions/manifestGetVoyagePort'

//* For Test
// import Path from 'path'
// import fs from 'fs'

// let path = Path.resolve('src', 'DocsParse', 'testData').toString()
// let file = Path.resolve(path, 'MANIFEST.xls').toString()
//*

export default interface ManifestParser {
	table: Headers.Manifest[]
	startIndex: number
}

export default class ManifestParser extends DocumentsParser {
	constructor(params) {
		super(params)
		const renamedTable = new FindTableTitle(this.bigSheet, 'manifest').getTable()
		this.table = renamedTable.table
		this.startIndex = renamedTable.startIndex
	}
	get parsed() {
		const {portCountry, loadingPort, vesselVoyage} = manifestGetVoyagePort( this.table )
		let voyage = this.fixVoyageNumber(vesselVoyage)

		let collect = {}
		let tmp: string
		this.table.forEach(fo => {
			let chk = fo.BLNO && fo.BLNO.match(/(INT|INJIAN)/)
			if (chk) {
				tmp = fo.BLNO
				collect[tmp] = getBooking(fo, voyage)
			} else if (tmp && fo.CONTAINERNO) {
				if (fo.BLNO) collect[tmp].hs = fo.BLNO
				collect[tmp]['containers'].push(
					getContainer(fo)
				)
			}
		});
		collect = _.toArray(collect)
		return _.sortBy(collect, 'bookingId')
	}
}

// let t = new ManifestParser(file).parsed

function getBooking(data: Headers.Manifest, voyageNumber: string): Booking | ParseError {
	try {
		data.MENSION = data.MENSION.toString().replace(/[^\d]/g, '')
	} catch (e) {
		console.error(e)
	}
	let result = () => {
		return {
			bookingId: data.BLNO,
			voyageNumber: voyageNumber,
			pkgs: data.PKGS,
			packType: data.PACKAGETYPE,
			gWeight: data.GWEIGHT,
			desc: data.GOODS,
			shipper: data.SHIPPER,
			consignee: data.CONSIGNEE,
			notifyParty: data.NOTIFYPARTY,
			mark: data.MARK,
			owner: data.containerowner ? data.containerowner.replace(/[^a-zA-Z]/g, '') : data.containerowner,
			type: `${data.MENSION}${data.TYPE}`,
			// hs: data.K ? data.K.replace(/\t+/g, '') : data.K,
			freight: data.FREIGHT,
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

function getContainer(data: Headers.Manifest): Container {
	try {
		data.CONTAINERNO = data.CONTAINERNO.toString().replace(/[^\d\w]/g, '')
	} catch (e) {
		console.log(typeof data.CONTAINERNO)
	}
	let resp
	try {
		resp = {
			vol: data.VOLUME,
			number: data.CONTAINERNO,
			seal: data.SEAL,
			packages: data.PKGS_2,
			gWeight: data.GWEIGHT_2,
			tWeight: data.CONTAINERTAREWEIGHT,
			cbm: data.CBM,
			freight: data.FREIGHT,
			owner: data.containerowner ? data.containerowner.replace(/\t+/g, '') : data.containerowner,
			type: data.MENSION.toString().replace(/[^\d]/g, '') + data.TYPE.replace(/[^a-zA-Z]/g, '')
		}
	} catch (e) {
		console.log(e)
	}
	return resp
}


