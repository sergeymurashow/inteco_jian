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
// 		"id": 11495,
// 		"title": "reportCut.xlsx",
// 		"size": 9621,
// 		"url": "http://89.108.119.30:22020/storage/1/2d89ec37-b827-46bc-b943-126fe5b0c6a6/reportCut.xlsx",
// 		"mimeType": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
// 		"metadata": null,
// 		"docType": "contract"
// 	}
// ]


// export const testDocs = (async () => {
// 		await documentProcess(testData)
// 	})()
