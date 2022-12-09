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
// 		"id": 11979,
// 		"title": "XIN LIAN CHANG_ifsum.edi",
// 		"size": 152893,
// 		"url": "http://89.108.119.30:22020/storage/1/8bde19f2-8a4c-43a5-960c-5d53a13a69ea/XIN%20LIAN%20CHANG_ifsum.edi",
// 		"mimeType": "false",
// 		"metadata": null,
// 		"docType": "ifsum",
// 		"record": [
// 			{
// 				"catalogId": "135",
// 				"recordId": "3"
// 			}
// 		]
// 	}
// ]


// export const testDocs = (async () => {
// 	await documentProcess(testData)
// })()
