import utils from './DocsParse/utils'
import { Obj } from './DocsParse/types/types'
import Path from 'path'

import ParseExcel from './DocsParse'
import IfsumParser from './DocsParse/classes/IfsumParser'
import CheckoutData from './CheckoutData'

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
	for (let j in data) {
		let i = data[j]
		switch (i.docType) {
			case 'ifsum':
				let record = i.record
				let ifsumParsed = new IfsumParser(i.fileName).parsing()
				let nonValid = await CheckoutData(ifsumParsed)
				utils.sendNonValid({ nonValid, record })
				break;

			default:
				result = result.concat(new ParseExcel(i.fileName, i.docType).get())
				if( +j >= data.length - 1 ) utils.sendParsed(result)
				break;
		}
	}

}

module.exports = documentProcess




// const testData = [
// 	{
// 		"id": 12272,
// 		"title": "fuckingTestReport.xlsx",
// 		"mimeType": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
// 		"size": 9837,
// 		"url": "http://89.108.119.30:22020/storage/1/21f5785b-6790-40fb-896e-dc4f787f449a/fuckingTestReport.xlsx",
// 		"loading": false,
// 		"docType": "contract"
// 	}
// ]


// export const testDocs = (async () => {
// 	await documentProcess(testData)
// })()
