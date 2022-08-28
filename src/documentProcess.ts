import { downloadFiles } from './utils/downloadFiles'
import { manifestParser, contractAndBookingParser } from './parseExcel'
import { createCatalogs } from './utils/createCatalogs'
import { mergeByBookingId } from './mergeByBookingId'
import { sendParsed } from './callbacks/callbackParsedDocs'
import { Obj } from './types'
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




const testData = [
	{
		"id": 10602,
		"title": "INTECO-NINGBO HUA DONG 88 INT09N88.xlsx",
		"size": 29359,
		"url": "http://89.108.119.30:22020/storage/1/779fb2df-065d-498f-8f4e-7ae7d17c4f8b/INTECO-NINGBO%20HUA%20DONG%2088%20INT09N88.xlsx",
		"mimeType": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
		"metadata": null,
		"docType": "contract",
		"voyage": [
			{
				"catalogId": "79",
				"recordId": "92"
			}
		]
	}
]

	; (async () => {
		await documentProcess(testData)
	})()
