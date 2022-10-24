import xls from 'xlsx'
import _ from 'lodash'

import { Obj } from '../types/index'
import utils from '../utils'

export default interface DocumentsParser {
	constructor(
		filePath: string,
	)
	fixVoyageNumber: DocumentsParser.FixVoyageNumber
	bigSheet: DocumentsParser.matrix[]
	filePath?: string

}

export declare namespace DocumentsParser {
	export interface FixVoyageNumber {
		(
			voyageNumber: string
		)
	}
	export type matrix = Obj
}


export default class DocumentsParser {
	fixVoyageNumber: DocumentsParser.FixVoyageNumber
	constructor(filePath: string) {
		this.fixVoyageNumber = utils.fixVoyageNumber
		let sheet = xls.readFile(filePath).Sheets
		let parsedSheet = _.toArray(sheet).map(m => this.parseSheet(m))
		this.bigSheet = [].concat(...parsedSheet)

	}


	private parseSheet(sheet) {
		let obj: Obj = {
			data: {},
			getAddr(key: string) {
				return {
					col: key.match(/[A-Z]*/)[0],
					row: key.match(/\d+/)[0]
				}
			},
			set(data: Obj) {
				const keys = this.getAddr(Object.keys(data)[0])
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
}