import { Obj } from "src/types/types"

export interface VoyageData {
	direction: string
	port: string
	points: Points
}

type Points = {
	'163': Array<Obj>
	'164': Array<Obj>
}

export class VoyageData {
	constructor ( direction, points  ) {
		// console.log( { direction, points })
		this.direction = direction ? direction[0] : '1'
		this.points = points
		this.port = (() => { 
			let fieldNumber
			switch( this.direction ) {
				case '1': fieldNumber = '163'
				break;
				case '2': fieldNumber = '164'
				break;
			}


			return this.points[ fieldNumber ][0].recordValues[14][0].recordTitle
		})()
	}

	get data() {
		return {
			direction: this.direction,
			port: this.port
		}
	}

}