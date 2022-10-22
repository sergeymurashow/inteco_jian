import { downloadFiles } from './DocsParse/downloadFiles'
import { manifestParser, contractAndBookingParser } from './DocsParse/parseExcel'
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
	// console.log( mergedTable.length )
	sendParsed(mergedTable)
	let tt
}

module.exports = documentProcess




// const testData = [
// 	{
// 		"id": 10898,
// 		"title": "HUA XIANG 999 INT020.xlsx",
// 		"size": 35218,
// 		"url": "http://89.108.119.30:22020/storage/1/4f2c43c0-dac0-48f4-b446-232010a3c5b3/HUA%20XIANG%20999%20INT020.xlsx",
// 		"mimeType": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
// 		"metadata": null,
// 		"docType": "contract"
// 	}
// ]


// 	; (async () => {
// 		await documentProcess(testData)
// 	})()
