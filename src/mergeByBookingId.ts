import { Booking, Contract, Obj, Container, Params } from './types/types'




export function mergeByBookingId(bookings: Booking[] = [], contracts: Contract[] = []): Booking[] {
	const bookingIds = (() => {
		return new Set(
			bookings.map( m => m.bookingId ).concat( contracts.map( m => m.bookingId))
		)
	})()

	function findByBookingId(bookingId: string, collect: Array<Obj> ): any {
		let finded = collect.find( fi => {
			return fi.bookingId === bookingId
		})
		return finded ? finded : {}
	}

	let mergedCollection = []

	bookingIds.forEach( fo => {
		let b = findByBookingId( fo, bookings )
		let c = findByBookingId( fo, contracts )
		let mergedObject = Object.assign({}, findByBookingId( fo, bookings), findByBookingId( fo, contracts ) )
		mergedCollection.push( mergedObject )
		console.log( fo )
	})

	return mergedCollection
	
}



let bookings = [
	{
		bookingId: '1',
		container: '123'
	},
	{
		bookingId: '2',
		container: '124'
	},
	{
		bookingId: '3',
		container: '125'
	},
	{
		bookingId: '4',
		container: '126'
	}
]

let contracts = [
	{
		bookingId: '1',
		contract: '001'
	},
	{
		bookingId: '2',
		contract: '002'
	},
	{
		bookingId: '3',
		contract: '003'
	}
]

// let test = mergeByBookingId( bookings, contracts )