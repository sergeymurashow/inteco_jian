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
// 		"id": 11509,
// 		"title": "XIN LONG YUN 55 INT07N55.xlsx",
// 		"size": 24913,
// 		"url": "http://89.108.119.30:22020/storage/1/6c76c35f-f3d6-4dc3-879a-06d3b5698957/XIN%20LONG%20YUN%2055%20INT07N55.xlsx",
// 		"mimeType": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
// 		"metadata": null,
// 		"docType": "contract"
// 	}
// ]


// export const testDocs = (async () => {
// 		await documentProcess(testData)
// 	})()
