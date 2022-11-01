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

	// utils.sendParsed(result)
}

module.exports = documentProcess




const testData =  [
	{
		"id": 11225,
		"title": "report.xlsx",
		"url": "http://89.108.119.30:22020/storage/1/5731ca57-c2e9-41d3-8d6b-aba1ed819c6d/report.xlsx",
		"mimeType": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
		"docType": "contract"
	}
]


	; (async () => {
		await documentProcess(testData)
	})()
