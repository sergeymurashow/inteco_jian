import { Any } from "src/DocsParse/classes/IfsumParser"

declare namespace MessageFoundInAnotherBooking{
	interface body {
		ifsumBookingId: string
	}

	interface bodyAdd {
		containerId: string
		containerFoundInBooking: string
	}

	type result = {
		message: string,
		data
	}
}

export class Message {
	message: string
	result
	constructor( message?: string ) {
		this.message = message
		this.result = {message: 'OK'}
	}
}

export class MessageFoundInAnotherBooking extends Message{
	body: MessageFoundInAnotherBooking.body
	result: MessageFoundInAnotherBooking.result
	constructor(body: MessageFoundInAnotherBooking.body, message?: string) {
		super(message)
		this.body = {ifsumBookingId: body.ifsumBookingId}
		this.message = message ? message : `Booking didn't find in manifest. Them container found in another booking`
		this.result = { message: this.message,  data: this.body }
	}
	add( addBody: MessageFoundInAnotherBooking.bodyAdd ) {
		Object.assign( this.result.data, addBody )
	}
}
