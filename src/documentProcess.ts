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
// 		"id": 11305,
// 		"title": "reportCut.xlsx",
// 		"size": 9843,
// 		"url": "http://89.108.119.30:22020/storage/1/646bf69b-b44b-45f9-a062-31f5e7ff9e25/reportCut.xlsx",
// 		"mimeType": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
// 		"metadata": null,
// 		"docType": "contract"
// 	}
// ]


// 	; (async () => {
// 		await documentProcess(testData)
// 	})()
