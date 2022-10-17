// import { Obj } from "src/types/types";
// import { tariffList } from "./tarifList";

// export interface Tarif{
// 	port: string
// 	direction: string
// 	discount: number
// 	socCoc: string
// 	type: string
// }

// export class Tarif {
// 	constructor({ socCoc, port, direction, type, discount }) {
// 		this.socCoc = socCoc
// 		this.type = type
// 		this.discount = discount
// 		this.port = port[0].recordTitle
// 		this.direction = direction
// 	}
// }

// export interface TarifParse {
// 	tarifFields: Array<Obj>
// }

// export class TarifParse {
// 	constructor(tarifFields) {
// 		this.tarifFields = tarifFields
// 	}

// 	get parsed(): Array<Tarif> {
// 		return this.tarifFields.map(m => {
// 			let {values} = m
// 			return new Tarif({
// 				socCoc: values['6'],
// 				port: values['3'],
// 				direction: values['11'],
// 				type: values['5'],
// 				discount: values['1']
// 			})
// 		})
// 	}
// }




// let t = new TariffParse( tariffList )
// let q = t.parsed




