import { input } from "../files/input";
import { voyageParse, bookingParse } from "./utils/ifsumFunctions";
import { getIfsum } from "./utils/toIfsum";
import _ from 'lodash'

let voyage = new voyageParse(input.voyage.values)
voyage.setContainersNumber( 137 )

let depart = voyage.getPorts().depart
let destination = voyage.getPorts().destination

const result = `${getIfsum(voyage.getVoyageInfo())}\n${
	input.bookings.map( m => {
		let tmpBook = new bookingParse( m.values, depart, destination )
		return getIfsum(tmpBook.getBookingInfo())
	})
	.join('\n')
	
}` 

let t = result

console.log( t )

