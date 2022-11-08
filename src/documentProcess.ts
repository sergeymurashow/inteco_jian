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




// const testData =   [
// 	{
// 		"id": 11503,
// 		"title": "MANIFEST-01.xls",
// 		"size": 279040,
// 		"url": "http://89.108.119.30:22020/storage/1/1238aeb5-f839-412f-9ca9-dc7c1456c2cf/MANIFEST-01.xls",
// 		"mimeType": "application/vnd.ms-excel",
// 		"metadata": null,
// 		"docType": "manifest"
// 	}
// ]


// export const testDocs = (async () => {
// 		await documentProcess(testData)
// 	})()
