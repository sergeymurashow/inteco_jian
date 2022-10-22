import Fs from 'fs'
import Path from 'path'
import Axios from 'axios'
import { createCatalogs } from '../utils/createCatalogs'

type File = {
	id: number
	docType: string
	title: string
	size: number
	url: string
	mimeType: string
	metadata: string | null
	fileName?: string
}

export async function downloadFiles(file: File) {
	console.log('file', file)
	let url = file.url;
	let writer = Fs.createWriteStream(file.fileName);
	let resp = await Axios({ url, method: 'GET', responseType: 'stream' })

	resp.data.pipe(writer)

	return new Promise((res, rej) => {
		writer.on('finish', res)
		writer.on('error', rej)
	})

};


// (async () => {

// 	let testData: File[] = [
// 		{
// 			"id": 10448,
// 			"title": "manifest.xls",
// 			"size": 172032,
// 			"url": "http://89.108.119.30:22035/storage/1/d8b681ca-a343-4203-8c77-51470e389853/manifest.xls",
// 			"mimeType": "application/vnd.ms-excel",
// 			"metadata": null,
// 			"docType": "manifest"
// 		},
// 		{
// 			"id": 10449,
// 			"title": "emailTemplate.xlsx",
// 			"size": 15286,
// 			"url": "http://89.108.119.30:22035/storage/1/51389612-071c-4ace-a89b-010fa91977fb/emailTemplate.xlsx",
// 			"mimeType": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
// 			"metadata": null,
// 			"docType": "contract"
// 		}
// 	]

// 	let dir = Path.resolve(__dirname, '../tmp')
// 	createCatalogs(dir)
// 	testData = testData.map( m => {
// 		m.fileName = Path.resolve( dir, m.title )
// 		return m
// 	})
	
// 	for (let i in testData) {
// 		await downloadFiles(testData[i])
// 	}
// })