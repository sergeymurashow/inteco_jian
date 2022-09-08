import { downloadFiles } from './utils/downloadFiles'
import { manifestParser, contractAndBookingParser } from './parseExcel'
import { createCatalogs } from './utils/createCatalogs'
import { mergeByBookingId } from './mergeByBookingId'
import { sendParsed } from './callbacks/callbackParsedDocs'
import { Obj } from './types/types'
import Path from 'path'
import Fs from 'fs'



async function documentProcess(data) {

	let dir = Path.resolve(__dirname, '../tmp')
	createCatalogs(dir)
	data = data.map(m => {
		m.fileName = Path.resolve(dir, m.title)
		return m
	})

	for (let i of data) {
		await downloadFiles(i)
	}

	let result: Obj = {}
	for (let i of data) {
		switch (i.docType) {
			case 'manifest':
				result.booking = manifestParser({ fileName: i.fileName, voyage: i.voyage })
				break;
			case 'contract':
				result.contract = contractAndBookingParser({ fileName: i.fileName, voyage: i.voyage })
				break;
		}
	}

	let mergedTable = mergeByBookingId(result.booking, result.contract)
	sendParsed(mergedTable)
	let tt
}

module.exports = documentProcess




// const testData = [
// 	{
// 		"id": 10643,
// 		"title": "HUA DONG 88 INT11N88.xlsx",
// 		"size": 15408,
// 		"url": "http://89.108.119.30:22035/storage/1/a1b570fa-a971-4c99-8375-b78e2a293d85/HUA%C2%A0DONG%C2%A088%C2%A0INT11N88.xlsx",
// 		"mimeType": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
// 		"metadata": null,
// 		"docType": "contract"
// 	}
// ]

// 	; (async () => {
// 		await documentProcess(testData)
// 	})()
