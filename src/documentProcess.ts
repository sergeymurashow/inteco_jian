import { downloadFiles } from './downloadFiles'
import { manifestParser, contractAndBookingParser } from './parseExcel'
import { createCatalogs } from './createCatalogs'
import { mergeByBookingId } from './mergeByBookingId'
import { sendParsed } from './callback'
import { Obj } from './types'
import Path from 'path'
import Fs from 'fs'



export async function documentProcess(data) {

	let dir = Path.resolve(__dirname, '../tmp')
	createCatalogs(dir)
	data = data.map(m => {
		m.fileName = Path.resolve(dir, m.title)
		return m
	})

	for (let i of data) {
		await downloadFiles(i)
	}

	let result: Obj = {}
	for (let i of data) {
		switch (i.docType) {
			case 'manifest':
				result.booking = manifestParser({ fileName: i.fileName })
				break;
			case 'contract':
				result.contract = contractAndBookingParser({ fileName: i.fileName })
				break;
		}
	}

	let mergedTable = mergeByBookingId(result.booking, result.contract)
	sendParsed(mergedTable)
	let tt
}





const testData = [
	{
		"id": 10454,
		"title": "manifest.xls",
		"size": 142848,
		"url": "http://89.108.119.30:22035/storage/1/cd3e877f-666c-4ad0-bf8f-a232f5b57c79/manifest.xls",
		"mimeType": "application/vnd.ms-excel",
		"metadata": null,
		"docType": "manifest"
	  },
	// {
	// 	"id": 10451,
	// 	"title": "INTECO Qingdao 6.20.xlsx",
	// 	"size": 22655,
	// 	"url": "http://89.108.119.30:22035/storage/1/fec9f0a2-c24f-4643-9d3c-a0fae357c153/INTECO%20Qingdao%206.20.xlsx",
	// 	"mimeType": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
	// 	"metadata": null,
	// 	"docType": "contract"
	// }
]

	; (async () => {
		await documentProcess(testData)
	})()
