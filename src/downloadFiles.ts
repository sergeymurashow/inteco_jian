import fs from 'fs'
import path from 'path'
import Axios from 'axios'
import {manifestParser} from '../src/parseExcel'
import {createCatalogs} from './createCatalogs'

type File = {
	id: number
	title: string
	size: number
	url: string
	mimeType: string
	metadata: string | null
}

module.exports = async function downloadFiles( files: Array<File> ) {
	console.log( 'files', files )
	let dir = path.resolve( __dirname, '../tmp' )
	createCatalogs( dir )
	for ( let file of files ) {
		let url = file.url;
		let filePath = `${ dir }/${
			file.title
		}`
		// console.log( filePath )
		let writer = fs.createWriteStream( filePath );
		await Axios( { url, method: 'GET', responseType: 'stream' } ).then( async function ( response ) {
			let t
			response.data.pipe( writer );
			// writer.on( 'finish', () => ( manifestParser( { fileName: filePath } ) ) );
			writer.on( 'finish', () => ( manifestParser( { fileName: filePath } ) ) );
		} );
	};

};

// (async() => {
// 	await downloadFiles( [
// 		{
// 			"id": 10387,
// 			"title": "manifest.xls",
// 			"size": 172032,
// 			"url": "http://89.108.119.30:22020/storage/1/0976c536-509a-4e6e-bafe-830867547165/manifest.xls",
// 			"mimeType": "application/vnd.ms-excel",
// 			"metadata": null
// 		}
// 	]
// 	)
// })