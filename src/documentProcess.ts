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
// 		"id": 11732,
// 		"title": "FENG ZE YUAN I01QFZ.xlsx",
// 		"size": 23652,
// 		"url": "http://89.108.119.30:22020/storage/1/bee397d5-e5fd-4a9f-bc3f-7f2091874e41/FENG%20ZE%20YUAN%20I01QFZ.xlsx",
// 		"mimeType": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
// 		"metadata": null,
// 		"docType": "contract"
// 	}
// ]


// export const testDocs = (async () => {
// 		await documentProcess(testData)
// 	})()
