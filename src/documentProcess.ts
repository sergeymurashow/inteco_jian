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




const testData = [
	{
		"id": 10941,
		"title": "testContracts.xlsx",
		"size": 9738,
		"url": "http://89.108.119.30:22035/storage/1/713a6a5f-e48b-47fb-943c-90c3d7813e15/testContracts.xlsx",
		"mimeType": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
		"metadata": null,
		"docType": "contract"
	},
	{
		"id": 10944,
		"title": "testContracts2.xlsx",
		"size": 9966,
		"url": "http://89.108.119.30:22035/storage/1/475f2321-8bb1-4cee-ba49-1e98cb3bde85/testContracts2.xlsx",
		"mimeType": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
		"metadata": null,
		"docType": "contract"
	}
]


	; (async () => {
		await documentProcess(testData)
	})()
