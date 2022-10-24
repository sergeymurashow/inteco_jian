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

	let result: Obj = {}
	for (let i of data) {
		result[i.id] = new ParseExcel(i.fileName, i.docType).get()
	}

	let t

	// utils.sendParsed(result)
}

module.exports = documentProcess




// const testData = [
// 	{
// 		"id": 11068,
// 		"title": "REPORT.xlsx",
// 		"size": 33034,
// 		"url": "http://89.108.119.30:22020/storage/1/ed9580e5-b5fd-48c0-8f25-a7e8fb8e9834/REPORT.xlsx",
// 		"mimeType": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
// 		"metadata": null,
// 		"docType": "contract"
// 	}
// ]


// 	; (async () => {
// 		await documentProcess(testData)
// 	})()
