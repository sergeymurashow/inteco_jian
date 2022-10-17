import { Obj } from "src/types/types";
import { tariffList } from "./tariffList";

const optionsValues = {
	socCoc: {
		'1': 'SOC',
		'2': 'COC'
	},
	type: {
		'1': '20',
		'2': '40'
	}
}

export type Option = {
	socCoc: string
	type: string
	cost: number
}

export interface Tariff {
	inputTariffList: Array<Obj>
	outputTariffList: Array<TariffParsed>
}

export interface TariffParser {
	tariffFields: Obj
	parsedData: Array<TariffParsed>
}

export interface TariffParsed {
	port: string
	direction: string
	socCoc: string
	type: string
	cost: number
}

export class TariffParser {
	constructor(tariffFields) {
		this.tariffFields = tariffFields
		this.parsedData = []
	}

	private voyageData() {
		let values = this.tariffFields.values
		let portName = values[3][0].recordTitle
		return portName
	}

	private prettyOption(option): Option {
		let recordValues = option.recordValues
		return {
			socCoc: optionsValues.socCoc[recordValues[7]],
			type: optionsValues.type[recordValues[6]],
			cost: recordValues[8]
		}
	}

	private setTariff(port, direction, options) {
		const prettyTariff = options.map(m => {
			let prettyOptions = this.prettyOption(m)
			return {
				port,
				direction,
				socCoc: prettyOptions.socCoc,
				type: prettyOptions.type,
				cost: prettyOptions.cost
			}
		})
		this.parsedData = this.parsedData.concat(
			prettyTariff
		)
		return this.parsedData
	}

	private byDirections() {
		let values = this.tariffFields.values
		let portName = this.voyageData()
		this.setTariff(portName, 'IMPORT', values[4])
		this.setTariff(portName, 'EXPORT', values[5])
		return this.parsedData
	}

	get(): Array<TariffParsed> {
		return this.byDirections()
	}

}


export class Tariff {
	set tariffList(inputTariffList: Array<Obj>) {
		this.outputTariffList = []
		inputTariffList.forEach(fo => {
			this.outputTariffList = this.outputTariffList.concat(
				new TariffParser(fo).get()
			)
		})
	}

	get tariffList() {
		return this.outputTariffList
	}

	find({ port, direction, socCoc, type }) {
		if (!this.outputTariffList) throw new Error('Use ".set" before find Tariff')
		return this.outputTariffList.find(fi => {
			return 	fi.port === port &&
					fi.direction === direction &&
					fi.socCoc === socCoc &&
					fi.type === type
		})
	}

}






