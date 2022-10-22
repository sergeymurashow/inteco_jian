export = DocumentsParser
export as namespace DocumentsParser

import { Obj } from '../types/types'
type matrix = Obj

declare class DocumentsParser {
	constructor(
		filePath: string,
		fixVoyageNumber: DocumentsParser.FixVoyageNumber
	)
	bigSheet: matrix[]
	filePath?: string

}

declare namespace DocumentsParser {
	export interface FixVoyageNumber {
		(
			voyageNumber: string
		)
	}
}