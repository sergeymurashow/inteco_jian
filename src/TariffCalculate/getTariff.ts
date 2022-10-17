import { LoDashStatic } from "lodash"
import { Obj } from "src/types/types"

const moment = require('moment')
const _: LoDashStatic = require('lodash')

import { data } from "./data"
import { contractData } from "./contractData";
import { tariffList } from "./tariffList"

import { VoyageData } from "./VoyageData"

import { ContainerData, ContainersParse } from "./ContainerData"
import { Tariff } from "./Tariff"
import { sendTariff } from "../callbacks/callbackTariff"

const voyageData = data.values
const tariff = contractData.values[11]
const containersData = voyageData[144]

// getTariff({ voyageData, containersData, tariff })

export function getTariff({ voyageData, tariffInput }) {

	let voyageFields = voyageData.values
	let voyageParsed = new VoyageData(
		voyageFields[165],
		{
			163: voyageFields[163],
			164: voyageFields[164]
		}
	).data

	let tariff = new Tariff()
	tariff.tariffList = tariffInput

	let containersParsed = new ContainersParse(voyageParsed, voyageFields['144'])
		.parsed

	let resp: Obj = {}
	resp.containers = containersParsed.map(m => {
		let tariffForContainer = tariff.find(m)
		if ( !tariffForContainer ) throw new Error(`I don't find tariff :(`) 
		let ans = Object.assign({}, m, { cost: tariffForContainer.cost })
		return ans
	})

	resp.voyage = {
		catalogId: voyageData.catalogId,
		recordId: voyageData.id
	}

	console.log(JSON.stringify(resp, null, 1))

	sendTariff(resp)

}





