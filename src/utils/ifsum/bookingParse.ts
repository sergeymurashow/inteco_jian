import { voyageFromBpium, linkFieldFromBpium, bookingFromBpium, containerFieldFromBpium, port, Obj } from "../../types/types"
import { Counter } from "../counter"
import { toIfsum } from "./toIfsum"
import dayjs from "dayjs"

export default class bookingParse {
	booking: bookingFromBpium
	portDataReceipt: port
	portDataDestination: port
	portDataLoad: port
	containers: Obj[]
	constructor(
		booking: bookingFromBpium,
		portDataReceipt: port,
		portDataDestination: port,
		portDataLoad: port = portDataReceipt
	) {
		this.booking = booking
		this.portDataReceipt = portDataReceipt
		this.portDataLoad = portDataLoad
		this.portDataDestination = portDataDestination
		this.containers = (() => {
			const counter = new Counter( 3 )
			const contValues = this.booking[144]
				.map(m => m.recordValues)
				.map(m => {
					return {
						1: '51',
						2: counter.getNumber(),
						3: m[2],
						4: m[8],
						5: this.booking[158],
						6: 'F',
						7: m[11],
						8: m[7],
						9: m[3],
						10: m[10],
						11: '',
						12: '',
						13: '',
						14: '',
						15: '',
						16: ''
					}
				})
			return contValues
		})()
	}

	textPrettier(text: string) {
		return text.replace(/\:/g, '?:').replace(/\n/g, ' :')
	}

	getBookingInfo() {
		return {
			'12': {
				1: '12',
				2: this.booking[5],
				3: '',
				4: '',
				5: '',
				6: this.portDataReceipt.code,
				7: this.portDataReceipt.port,
				8: this.portDataLoad.code,
				9: this.portDataLoad.port,
				10: 'CY-CY',
				11: (() => {
					switch (this.booking[116][0]) {
						case '1': return 'P';
						case '2': return 'C';
						case '3': return 'F';
					}
				})(),
				12: (() => {
					const loadDate = this.booking[136]
					if (!loadDate) return ''
					return dayjs(loadDate).format('YYYYMMDD')
				})(),
				13: '',
				14: (() => {
					return dayjs( this.booking[136] ).format( 'YYYYMMDD' )
				})(),
				15: '',
				16: ''
			},
			'13': {
				1: '13',
				2: this.portDataDestination.code,
				3: this.portDataDestination.port,
				4: '',
				5: '',
				6: '',
				7: '',
				8: '',
				9: '',
				10: '',
				11: this.portDataDestination.code,
				12: this.portDataDestination.port,
				13: '',
				14: ''
			},
			'16': {
				1: '16',
				2: '',
				3: (() => {
					return this.textPrettier(this.booking[108])
				})()
			},
			'17': {
				1: '17',
				2: '',
				3: (() => {
					return this.textPrettier(this.booking[109])
				})()
			},
			'18': {
				1: '18',
				2: '',
				3: (() => {
					return this.textPrettier(this.booking[110])
				})()
			},
			'41': {
				1: '41',
				2: '001',
				3: '',
				4: this.booking[148] ? this.booking[148] : '',
				5: '',
				6: ''
			},
			'51': (() => {
				const textArray = this.containers.map(m => {
					return toIfsum(m)
				})
				return textArray
			})()
		}
	}
	
}