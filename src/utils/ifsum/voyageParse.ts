import { voyageFromBpium, linkFieldFromBpium, bookingFromBpium, containerFieldFromBpium, port, Obj } from "../../types/types"
import { Counter } from "../counter"
import { toIfsum } from "./toIfsum"
import dayjs from "dayjs"

export default class voyageParse {
	voyageData: voyageFromBpium
	vessel: linkFieldFromBpium[]
	containersNumber: number
	constructor(voyageData) {
		this.voyageData = voyageData
		this.vessel = this.voyageData[9]
	}
	getVesselCode() {
		return ''
	}
	getVesselName() {
		return this.vessel[0].recordValues[2]
	}
	getVoyageNumber() {
		return this.voyageData[2]
	}
	setContainersNumber(containersNumber: number) {
		this.containersNumber = containersNumber
	}
	getDates() {
		const etaPol = dayjs(this.voyageData[17]).format('YYYYMMDD')
		const etdPod = dayjs(this.voyageData[21]).format('YYYYMMDD')
		return { etaPol, etdPod }
	}
	getPorts() {
		const depart = {
			port: this.voyageData[16][0].recordValues[2],
			code: this.voyageData[16][0].recordValues[4]
		}
		const destination = {
			port: this.voyageData[20][0].recordValues[2],
			code: this.voyageData[20][0].recordValues[4]
		}
		return { depart, destination }
	}

	getVoyageInfo() {
		return {
			'0': {
				1: '00',
				2: 'IFSUM',
				3: 'MANIFEST',
				4: (() => { return '9' })(),
				5: (() => { return '' })(),
				6: (() => { return '' })(),
				7: (() => { return dayjs().format('YYMMDDHHMM') })(),
			},
			'10': {
				1: '10',
				2: '',
				3: this.getVesselName(),
				4: '',
				5: this.getVoyageNumber(),
				6: '',
				7: '',
				8: this.getDates().etdPod,
				9: this.getDates().etaPol,
				10: this.getPorts().depart.code,
				11: this.getPorts().depart.port,
				12: '',
				13: '',
				14: (() => { // Тут количество контейнеров или занятых мест?
					if (!this.containersNumber) throw 'Plz, use setContainersNumber() before!'
					return this.containersNumber

				})()
			},
			'11': {
				1: '11',
				2: '',
				3: ''
			}
		}
	}
}