import fs from 'fs'
import Path from 'path'
import { Obj } from 'src/DocsParse/types'

export type DocType = 'contract' | 'manifest'
export type Sample = {
	cellName: string,
	alias: string
}


const samples = {
	'contract': [
		'DATE',
		'S/C',
		'BOOKING NO',
		'NUMBER OF CONTAINER',
		'TYPE',
		'GROSS WEIGHT',
		'SHIPPER',
		'VESSEL',
		'ETD',
		'POL',
		'SOC-COC',
		'FREIGHT TERM'
	],
	'manifest': [
		'BL NO',
		'PKGS',
		'PACKAGE TYPE',
		'G/WEIGHT',
		'GOODS',
		'SHIPPER',
		'CONSIGNEE',
		'NOTIFY PARTY',
		'MARK',
		'REMARK',
		'MENSION',
		'TYPE',
		'VOLUME',
		'CONTAINER NO',
		'SEAL',
		'PKGS',
		'G/WEIGHT',
		'CONTAINER TARE WEIGHT',
		'CBM',
		'FREIGHT',
		'CONTAINER OWNER'
	],
	getWithAliases( docType : DocType): Sample[] {
		const tmp: Obj[] = []
		const mappedNames = this[docType].map( m => {
			let alias = m.replace(/[^\w\d]/g, '')
			let tryAlias = tmp.filter( f => f == alias )
			tmp.push(alias)
			if( tryAlias.length ) {
				alias = `${alias}_${tryAlias.length + 1}`
			}
			return {
				cellName: m,
				alias
			}
		})
		return mappedNames
	}
}

export default samples