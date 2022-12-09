import _ from "lodash";
import { Any, IfsumParsed } from "src/DocsParse/classes/IfsumParser";
import { Message, MessageFoundInAnotherBooking } from "./ValidatorMessages";

interface Validator {
	ifsum: IfsumParsed
	manifest: {
		catalogId: string,
		recordId: string,
		bookingId: string,
		containerNumber: string,
		values: Any
	}[]
}

type ValidateMode = 'onlyBookings' | 'withContainers'

class Validator {

	setIfsum(ifsum) {
		this.ifsum = ifsum
	}
	setManifest(manifest) {
		this.manifest = manifest.map(m => {
			const {
				21: booking,
				2: containerNumber
			} = m.values

			const {
				catalogId,
				recordId,
				recordTitle
			} = booking[0]

			return {
				catalogId,
				recordId,
				bookingId: recordTitle,
				containerNumber,
				values: m.values
			}
		})
	}

	private validateContainer(bookingId, containers) {
		const manifestContainers = this.manifest.filter(f => f.bookingId === bookingId)
			.map(m => m.containerNumber)
		return _.differenceBy(containers, manifestContainers, 'containersId')
	}

	private findContainer(containerId: string) {
		let bookingId
		try {
			const booking = this.manifest
				.find(fi => fi.containerNumber === containerId)
			bookingId = booking ? booking.bookingId : null
		} catch (e) {
			console.error( e )
		}
		return {
			bookingId,
			containerId
		}
	}

	private validateBooking(mode: ValidateMode, bookingId?: string, containers?) {
		if (mode === 'onlyBookings') {
			const bookingIdsManifest = _.uniq(this.manifest.map(m => m.bookingId))
			const bookingIdsIfsum = _.uniq(this.ifsum.conosaments.map(m => m.bookingId))
			const difference: string[] = _.difference(bookingIdsIfsum, bookingIdsManifest)
			return difference
		} else if (mode === 'withContainers') {
			const bookingsWithContainers = this.manifest.filter(f => f.bookingId === bookingId)
			const testStop = bookingId.match(/.*A/)
			if( testStop ) {
				let stop = 1
			}
			if (!bookingsWithContainers.length) {

				return containers.map(m => {
					let errMsg = new MessageFoundInAnotherBooking({
						ifsumBookingId: bookingId
					})

					let foundContainer = this.findContainer(m.containerId)

					errMsg.add({
						containerFoundInBooking: foundContainer.bookingId,
						containerId: foundContainer.containerId
					})

					return errMsg.result
				})

			} else {
				const validateBookingWithContainers = this.validateContainer(bookingId, containers)
				if (!validateBookingWithContainers.length) return new Message()
				return containers.map(m => {
					let errMsg = new MessageFoundInAnotherBooking({ ifsumBookingId: bookingId })
					let foundContainer = this.findContainer(m.containerId)
					errMsg.add({
						containerFoundInBooking: foundContainer.bookingId,
						containerId: m.containerId
					})
					return errMsg.result
				})
			}
		}
	}

	validate() {
		if (!this.ifsum) throw new Error('Setup ifsum for start')
		if (!this.manifest) throw new Error('Setup manifest for start')
		const result = this.ifsum.conosaments.map(m => {
			let validatedBooking = this.validateBooking('withContainers', m.bookingId, m.containers)
			if (!validatedBooking.length) return null
			return validatedBooking
		})
		return _.flatten(result.filter( f => f))
	}
}

export default Validator