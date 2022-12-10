import utils from './DocsParse/utils'
import { Obj } from './DocsParse/types/types'
import Path from 'path'

import IfsumParser from './DocsParse/classes/IfsumParser'
import CheckoutData from './CheckoutData'

async function ifsumProcess(data) {

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
		let record = i.record
		let ifsumParsed = new IfsumParser(i.fileName).parsing()
		let nonValid = await CheckoutData(ifsumParsed)
		result = result.concat(nonValid)
		// result = result.concat(await utils.sendNonValid({ nonValid, record }))
	}
	return result
}

module.exports = ifsumProcess