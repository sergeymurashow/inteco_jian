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
//             {
//                 "id": 10536,
//                 "title": "manifest_short.xls",
//                 "size": 34816,
//                 "url": "http://89.108.119.30:22035/storage/1/c2ddd3ab-ecb3-4de0-9660-9aec81a4f405/manifest_short.xls",
//                 "mimeType": "application/vnd.ms-excel",
//                 "metadata": null,
// 				"docType": 'manifest'
//             }
//         ]

	// ; (async () => {
	// 	await documentProcess(testData)
	// })()
