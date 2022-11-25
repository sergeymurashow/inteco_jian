import utils from './DocsParse/utils'
import { Obj } from './DocsParse/types/types'
import Path from 'path'

import ParseExcel from './DocsParse'

async function documentProcess(data) {

	let dir = Path.resolve(__dirname, 'tmp')
	utils.createCatalogs(dir)
	data = data.map(m => {
		m.fileName = Path.resolve(dir, m.title)
		return m
	})

	for (let i of data) {
		await utils.downloadFiles(i)

	}

	let result: Obj = []
	for (let i of data) {
		result = result.concat( new ParseExcel(i.fileName, i.docType).get() )
	}

	utils.sendParsed(result)
}

module.exports = documentProcess




// const testData =  [
// 	{
// 		"id": 11735,
// 		"title": "Manifest.xls",
// 		"size": 302592,
// 		"url": "http://89.108.119.30:22020/storage/1/ea04cd67-5b4e-4d7b-a055-6548fd30d725/Manifest.xls",
// 		"mimeType": "application/vnd.ms-excel",
// 		"metadata": null,
// 		"docType": "manifest"
// 	}
// ]


// export const testDocs = (async () => {
// 		await documentProcess(testData)
// 	})()
