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




const testData =  [
	{
		"id": 11336,
		"title": "manifestCut.xlsx",
		"size": 11862,
		"url": "http://89.108.119.30:22020/storage/1/30dc4ee0-4099-409b-a278-4668c2d9deb4/manifestCut.xlsx",
		"mimeType": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
		"metadata": null,
		"docType": "manifest"
	}
]


	; (async () => {
		await documentProcess(testData)
	})()
