import { downloadFiles } from './downloadFiles'
import { manifestParser, contractAndBookingParser } from './parseExcel'
import { createCatalogs } from './createCatalogs'
import { mergeByBookingId } from './mergeByBookingId'
import { sendParsed } from './callback'
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
				result.booking = manifestParser({ fileName: i.fileName })
				break;
			case 'contract':
				result.contract = contractAndBookingParser({ fileName: i.fileName })
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
// 		"id": 10478,
// 		"title": "contract_short.xlsx",
// 		"size": 9741,
// 		"url": "http://89.108.119.30:22035/storage/1/ef59f104-795e-4f57-b148-3992d7637585/contract_short.xlsx",
// 		"mimeType": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
// 		"metadata": null,
// 		"docType": "contract"
// 	}
// ]

// 	; (async () => {
// 		await documentProcess(testData)
// 	})()
