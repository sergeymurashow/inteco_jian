import { Obj } from "src/types/types"
import { VoyageDataOutput } from "./interfaces"

const optionsValues = {
	socCoc: {
		'1': 'SOC',
		'2': 'COC'
	},
	type: {
		'1': '20',
		'2': '20',
		'3': '40',
		'4': '40',
		'5': '20'
	},
	direction: {
		'1': 'IMPORT',
		'2': 'EXPORT'
	}
}

export interface ContainerData extends VoyageDataOutput {
	type: string
	socCoc: string
	catalogId: string
	recordId: string
}

export interface ContainersParse {
	containersFields: Array<Obj>
	voyageData: VoyageDataOutput
}

export class ContainersParse {
	constructor(voyageData, containersFields) {
		this.containersFields = containersFields
		this.voyageData = voyageData
	}

	get parsed(): Array<ContainerData> {
		return this.containersFields.map(m => {
			let { recordValues } = m
			return new ContainerData({
				recordId: m.recordId,
				catalogId: m.catalogId,
				port: this.voyageData.port,
				direction: this.voyageData.direction,
				type: recordValues['15'][0],
				socCoc: recordValues['17'][0]
			})
		})
	}
}


export class ContainerData {
	constructor({ port, direction, type, socCoc, catalogId, recordId }) {
		this.catalogId = catalogId
		this.recordId = recordId
		this.direction = optionsValues.direction[direction]
		this.port = port
		this.type = optionsValues.type[type]
		this.socCoc = optionsValues.socCoc[socCoc]
	}
}
