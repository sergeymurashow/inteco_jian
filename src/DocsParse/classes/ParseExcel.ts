//* NPM modules
import _ from 'lodash'
//*

//* Interfaces
import { Booking, ParseError } from '../common/ParseExcel'
//*

//* Indoor files
import ManifestParser from './ManifestParser'
import ReportParser from './ReportParser'
//*

export default class {
	fileName: string
	docType: string
	constructor(
		fileName,
		docType
	) {
		this.fileName = fileName
		this.docType = docType
	}
	get (): (Booking | ParseError)[] {
		switch (this.docType) {
			case 'manifest':
				return new ManifestParser( this.fileName ).parsed.map( m => Object.assign(m, {fileName: this.fileName}))
				break;
			case 'contract':
				return new ReportParser( this.fileName ).parsed.map( m => Object.assign(m, {fileName: this.fileName}))
				break;
		}
	}
}







