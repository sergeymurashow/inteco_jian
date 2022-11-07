// import { LoDashStatic } from "lodash"
// import { Obj } from "src/types/types"

// // const moment = require('moment')
// const _: LoDashStatic = require('lodash')


// import { VoyageData } from "./VoyageData"

// import { ContainersParse } from "./ContainerData"
// import { Tariff } from "./Tariff"
// import { sendTariff } from "../callbacks/callbackTariff"
// import { Discount } from "./Discount"

// // import { data } from "./testData/data"
// // import { contractData } from "./testData/contractData";
// // import { tariffList as tariffInput } from "./testData/tariffList"
// // const voyageData = data
// // const tariff = contractData.values[11]
// // const containersData = voyageData[144]

// // let TEST = new Tariff()
// // TEST.tariffList = tariffInput

// // let TEST = getTariff({ voyageData, tariffInput, contractData })
// // let t


// export function getTariff({ voyageData, tariffInput, contractData }) {

// 	let voyageFields = voyageData.values
// 	let voyageParsed = new VoyageData(
// 		voyageFields[165],
// 		{
// 			163: voyageFields[163],
// 			164: voyageFields[164]
// 		}
// 	).data

// 	let discount = {
// 		find({ port, direction, socCoc, type }) {
// 			return { discount: 0 }
// 		}
// 	}
// 	let contractDiscounts

// 	if( contractData ){
// 		contractDiscounts = contractData.values[11]
// 		discount = new Discount(contractDiscounts)
// 	}
	
// 	let tariff = new Tariff()
// 	tariff.tariffList = tariffInput

// 	let containersParsed = new ContainersParse(voyageParsed, voyageFields['144'])
// 		.parsed

// 	let resp: Obj = {}
// 	resp.containers = containersParsed.map(m => {
// 		let tariffForContainer = tariff.find(m)
// 		if (!tariffForContainer) throw new Error(`I don't find tariff :(`)
// 		let containerDiscount = discount.find(m)

// 		let ans = {
// 			price: tariffForContainer.price,
// 			discount: containerDiscount.discount,
// 			cost: tariffForContainer.price - containerDiscount.discount
// 		}

// 		return Object.assign({}, m, ans)
// 	})

// 	resp.voyage = {
// 		catalogId: voyageData.catalogId,
// 		recordId: voyageData.id
// 	}

// 	console.log(JSON.stringify(resp, null, 1))

// 	sendTariff(resp)

// }





