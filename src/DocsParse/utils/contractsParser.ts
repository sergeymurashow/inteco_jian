import DocumentsParser from "../classes/DocumentsParser";
import  transcribeContractNumber  from "./transcribeContractNumber";
import path from "path";
import fs from 'fs'
import dayjs from "dayjs";
import { Obj } from "../types/types";

const filePath = path.resolve('files', 'ContractsList.xlsx')
let table = new DocumentsParser(filePath).bigSheet

function clearString(data: string | number ): string {
	if ( !data ) return null
	if( typeof data === 'number' ) return data.toString()
	try {
		if (!data) return
		return data.replace(/(^\s+|\s+$)/g, '')
	} catch (err) {
		console.error(err)
	}
}

type contract = {
	number: string
	date?: string
	name?: string
}

class Contract {
	number: string
	date?: string
	name?: string
	constructor(data: contract) {
		this.date = data.date
		this.name = data.name
		this.number = data.number
	}
}

const result: Array<string> = []

table.forEach(fo => {
	if (fo.A) {
		let contractNo
		const data = (() => {
			let tmp = fo.A.split(/от/)
			let number = tmp[0]
			let date = clearString(tmp[1])
			return  {number, date}
		})()
		try {
			contractNo = transcribeContractNumber(data.number).answer
		} catch( e ) {
			console.log( e )
		}
		if ( contractNo ) {
			result.push( [`${contractNo} от ${data.date}`, fo.B ].join('\t') )
		} 
	}

})

let ansPath = path.resolve( 'files', 'output.txt' )
fs.writeFileSync( ansPath, result.join('\n') )


let t = 1

let q