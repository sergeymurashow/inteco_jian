import { Obj } from "src/types/types"

export function mergeSheets(sheets: Obj) {
	let result: Obj = {}

	for (let i in sheets) {
		let val = sheets[i]
		Object.assign(result, renameCell(val, i))
	}

	return result
}

// Нахуярить замыкание!!!

function renameCell( sheet: Obj, add: string) {
	let result: Obj = {}
	for( let i in sheet ) {
		let val = sheet[i]
		let tmp = i.replace(/(\d+)/, '_(' + add + ')_$1')
		result[tmp] = val
	}
	return result
}

let t = {
	'A1': 1,
	'A2': 2
}

let e