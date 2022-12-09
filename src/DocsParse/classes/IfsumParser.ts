import { Obj } from "../types";
import fs from 'fs'
import os from 'os'

import getVoyageData from "./ifsumFunctions/getVoyageData";
import getConos from "./ifsumFunctions/getConos";
import getDelivery from "./ifsumFunctions/getDelivery";
import getContainer from "./ifsumFunctions/getContainer";

export type Any = {
	[key: string]: any
}

export interface IfsumParsed {
	generalData: { voyageNumber?: string }
	conosaments: {
		bookingId: string,
		containers?: {
			containerId?: string,
			seal?: string
		}[],
		loadPort?: string,
		deliveryPort?: string
	}[]
}

interface IfsumParser extends IfsumParsed {
	fileName: string
	ifsum: string
	conosId: number
	parsing( ifsumInput: string ): IfsumParsed
}

class IfsumParser {
	constructor( fileName ) {
		this.ifsum = fs.readFileSync( fileName, 'utf-8' )
		this.generalData
		this.conosaments = []
		this.conosId
	}

	private saveIntoConos( input: Any ): void {
		Object.assign( this.conosaments[this.conosId], input )
	} 

	private parse( ifsumString: string ) {
		const firstDigits = ifsumString.split(':')[0]
		switch( firstDigits ) {
			case '00': 'header'
			break;
			case '10': this.generalData = getVoyageData( ifsumString )
			break;
			case '11': 'soc-coc'
			break;
			case '12': (() => { // loadPort, bookingId
				const conos = getConos( ifsumString )
				this.conosId = this.conosaments.push(
					Object.assign( conos, {containers: []})
					) - 1
			})()
			break;
			case '13': (() => { // deliveryPort
				const delivery = getDelivery( ifsumString )
				this.saveIntoConos( delivery )
			})()
			break;
			case '51': (() => {
				const container = getContainer( ifsumString )
				this.conosaments[this.conosId].containers.push( container )
			})()
			break;
		}
	}

	parsing( ifsumInput: string = this.ifsum ): IfsumParsed {
		const rawData = ifsumInput.split(`${os.EOL}`)
		rawData.forEach( fo => {
			fo = fo.replace(/'+/, '')
			this.parse( fo )
		})
		return {
			generalData: this.generalData,
			conosaments: this.conosaments
		}
	}
}

export default IfsumParser
// let file = '/Users/sergey.murashow/Codets/intecoJiangjie/api/src/DocsParse/testData/2699/XIN LIAN CHANG_ifsum.edi'
// ;(async() => {
// 	let test = new IfsumParser( file ).parsing()
// 	let test2 = await CheckoutData( test )
// 	let t = 1
// })()
