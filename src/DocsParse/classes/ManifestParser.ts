import _ from 'lodash'


import DocumentsParser from "./DocumentsParser"
import { Booking, Container, matrix, ParseError } from '../types/types'
import FindTableTitle from './FindTableTitle'
import { Headers } from './things/types'
import manifestGetVoyagePort from '../functions/manifestGetVoyagePort'
import { manifestFields, containerFields } from './things/manifestItemsChecker'
import answerChecker from '../functions/answerChecker'

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
		const { portCountry, loadingPort, vesselVoyage } = manifestGetVoyagePort(this.table)
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
	function resp(booking: Headers.Manifest): Booking {
		return {
			bookingId: manifestFields.bookingId(booking.BLNO),
			voyageNumber: manifestFields.voyageNumber(voyageNumber),
			pkgs: manifestFields.pkgs(booking.PKGS),
			packType: manifestFields.packType(booking.PACKAGETYPE),
			gWeight: manifestFields.gWeight(booking.GWEIGHT),
			desc: manifestFields.desc(booking.GOODS),
			shipper: manifestFields.shipper(booking.SHIPPER),
			consignee: manifestFields.consignee(booking.CONSIGNEE),
			notifyParty: manifestFields.notifyParty(booking.NOTIFYPARTY),
			mark: manifestFields.mark(booking.MARK),
			owner: manifestFields.owner(booking.containerowner),
			type: manifestFields.type(booking.MENSION, booking.TYPE),
			// hs: booking.K ? booking.K.replace(/\t+/g, '') : booking.K,
			freight: manifestFields.freight(booking.FREIGHT),
			isManifest: manifestFields.isManifest([1]),
			docType: manifestFields.docType('manifest'),
			containers: [
				getContainer(booking)
			]
		}
	}
	try {
		answerChecker(resp(data))
	} catch (e) {
		console.error(e)
	}
	return resp(data)
}


function getContainer(data: Headers.Manifest): Container {
	try {
		data.CONTAINERNO = data.CONTAINERNO.toString().replace(/[^\d]/g, '')
	} catch (e) {
		console.log(typeof data.CONTAINERNO)
	}

	function resp(containers: Headers.Manifest): Container {

		return {
			vol: containerFields.vol(containers.VOLUME),
			number: containerFields.number(containers.CONTAINERNO),
			seal: containerFields.seal(containers.SEAL),
			packages: containerFields.packages(containers.PKGS_2),
			gWeight: containerFields.gWeight(containers.GWEIGHT_2),
			tWeight: containerFields.tWeight(containers.CONTAINERTAREWEIGHT),
			cbm: containerFields.cbm(containers.CBM),
			freight: containerFields.freight(containers.FREIGHT),
			owner: containerFields.owner(containers.containerowner),
			type: containerFields.type(containers.MENSION, containers.TYPE),
		}

	}
	try {
		answerChecker(resp(data))
	} catch (e) {
		console.error(e)
	}
	return resp(data)
}


