import xls from 'xlsx'
import { readFile } from 'xlsx'
import { Obj } from 'src/types'
import _ from 'lodash'

export default function( filePath: string ) {
	let sheet = xls.readFile(filePath).Sheets
	let parsedSheet = _.toArray(sheet).map(m => parseSheet(m))
	let bigSheet = [].concat(...parsedSheet)
	return bigSheet
}

function getAddr(key: string) {
	return {
		col: key.match(/[A-Z]*/)[0],
		row: key.match(/\d+/)[0]
	}
}

function parseSheet(sheet) {
	let obj: Obj = {
		data: {},
		set(data: Obj) {
			const keys = getAddr(Object.keys(data)[0])
			const value = Object.values(data)[0]
			if (!this.data[keys.row]) this.data[keys.row] = {}
			this.data[keys.row][keys.col] = value.v
		},
		get(): Array<Obj> {
			return _.toArray(this.data)
		}
	}

	for (let i in sheet) {
		if (!i.includes('!')) {
			obj.set({ [i]: sheet[i] })
		}
	}

	let arrayData: Array<Obj> = obj.get()
	return arrayData
}

