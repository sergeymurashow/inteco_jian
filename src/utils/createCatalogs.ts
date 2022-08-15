import fs from 'fs'
import path from 'path'

export function createCatalogs(dir: string) {
	try { fs.readdirSync(dir) }
	catch(e) {
		fs.mkdirSync(dir, { recursive: true })
	}
}

// createCatalogs(path.resolve('test2', 'test3'))