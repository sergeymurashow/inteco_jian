import fs from 'fs'
import path from 'path'
import { createCatalogs } from './createCatalogs'

let fn = path.resolve( 'files', 'test.txt' )

export function safeFile( filePath: string, body: string ) {
	let fPath = path.dirname( filePath )
	createCatalogs(fPath)
	fs.writeFileSync( filePath, body )
	return
}

