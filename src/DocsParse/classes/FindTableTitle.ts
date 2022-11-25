import { Obj } from "../types";
import samples, { DocType, Sample } from './things/samples'
import { Headers } from "./things/types";

import Path from 'path'
import DocumentParser from './DocumentsParser'


type DataCollector = {
	tableHeader?,
	headerTemplate?,
	renamedTable?,
	startIndex?
}

export default interface FindTableTitle {
	docType: DocType
	tableArray: Obj[]
	dataCollector?: DataCollector
}

function clearCell(cell: string) {
	return cell.replace(/[^a-zA-Z\d]/g, '')
}

export default class FindTableTitle {

	constructor(tableArray: Obj[], docType: DocType) {
		this.tableArray = tableArray
		this.docType = docType
		this.dataCollector = {}
	}

	private findString() {
		const documentSample = samples.getWithAliases(this.docType)
		const raperCell = documentSample[0]
		const tableHeader = this.tableArray.find((str, index, array) => {
			for (let i in str) {
				let cell = clearCell(str[i].toString()).toUpperCase()
				if (cell === raperCell.alias) {
					this.dataCollector.startIndex = index
					return str
				}
			}
		})
		for( let i in tableHeader ) {
			tableHeader[i] = clearCell(tableHeader[i].toString()).toUpperCase()
		}
		Object.assign(this.dataCollector, { tableHeader })
		return this
	}

	private makeTemplate() {
		const sample: Sample[] = samples.getWithAliases(this.docType)

		const template = (() => {

			const renamedObject: Obj = {}

			for (let i in this.dataCollector.tableHeader) {
				let oldCellName = this.dataCollector.tableHeader[i]
				let foundSample = sample.find(fi => {
					return fi.alias == oldCellName
				})

				if (foundSample) {
					foundSample.cellName = `${foundSample.cellName}_checked`
					renamedObject[i] = foundSample.alias
				}
			}

			this.dataCollector.headerTemplate = renamedObject
			return this
		})()

		return template
	}

	private renameColumns() {

		function giver<T>(data: T): T {
			return data
		}
		

		const collector = []
		this.tableArray.forEach(fo => {
			const forEachCollector = {}
			for (let i in fo) {
				if (fo[i]) {
					forEachCollector[this.dataCollector.headerTemplate[i]] = fo[i]
				}
			}
			collector.push(forEachCollector)
		})

		this.dataCollector.renamedTable = collector
		let resp
		switch( this.docType ) {
			case 'manifest': resp = giver<Headers.Manifest[]>(collector)
			break;
			case 'contract': resp = giver<Headers.Contract[]>(collector)
			break;
		}
		return resp
	}
	getTable() {
		this.findString()
		this.makeTemplate()
		this.renameColumns()
		return { table: this.dataCollector.renamedTable, startIndex: this.dataCollector.startIndex }
	}
}

// let file = Path.resolve('src', 'DocsParse', 'testData', 'MANIFEST-01.xls')

// let parser = new DocumentParser(file)
// let sheet = parser.bigSheet

// let test = new FindTableTitle(sheet, 'manifest').getTable()
	
