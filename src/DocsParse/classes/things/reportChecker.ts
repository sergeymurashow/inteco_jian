import dayjs from 'dayjs'
import toObject from 'dayjs/plugin/toObject'
import objectSupport from 'dayjs/plugin/objectSupport'
import utc from 'dayjs/plugin/utc'

import * as prettyData from '../prettyData'
import { Headers } from '../things/types'
import utils from "../../utils"


class ReportContainError extends Error {
	groupName: string
	constructor(msg: string) {
		super(msg)
		this.groupName = 'Manifest contain Error'
		Object.setPrototypeOf(this, ReportContainError)
		console.group(this.groupName)
		console.error(msg)
		console.error(this.stack)
		console.groupEnd()
	}
}

class ReportContainersContainError extends ReportContainError {
	constructor(options) {
		super(options)
		this.groupName = 'Containers contain Error'
	}
}

export const reportFields = {
	bookingId: (data) => {
		if (!data) return null
		if (typeof data !== 'string') return null
		try {
			return utils.clearString(data)
		} catch (e) {
			return null
		}
	},
	applicationDate: (data) => {
		try {
			return makeDate(utils.clearString(data))
		} catch (e) {
			return null
		}
	},
	contract: (data) => {
		try {
			return prettyData.contract(data)
		} catch (e) {
			return null
		}
	},
	voyageNumber: (data) => {
		try {
			return utils.fixVoyageNumber(data)
		} catch (e) {
			return null
		}
	},
	containersCount: (data) => {
		try {
			return +utils.clearString(data)
		} catch (e) {
			return null
		}
	},
	type: (data) => {
		try {
			return utils.clearString(data)
		} catch (e) {
			return null
		}
	},
	gWeight: (data) => {
		try {
			return prettyData.gWeight(data.toString())
		} catch (e) {
			return null
		}
	},
	shipper: (data) => {
		try {
			return utils.clearString(data)
		} catch (e) {
			return null
		}
	},
	port: (data) => {
		try {
			return utils.clearString(data)
		} catch (e) {
			return null
		}
	},
	freight: (data) => {
		try {
			return utils.clearString(data)
		} catch (e) {
			return null
		}
	},
	owner: (data) => {
		try {
			return utils.clearString(data)
		} catch (e) {
			return null
		}
	},
	docType: (data) => {
		try {
			return 'contract'
		} catch (e) {
			return null
		}
	}
}

// export const containerFields = {
// 	vol: (data) => { return data },
// 	number: (data) => { return data },
// 	seal: (data) => { return data },
// 	packages: (data) => { return data },
// 	gWeight: (data) => { return data },
// 	tWeight: (data) => { return data },
// 	cbm: (data) => { return data },
// 	freight: (data) => { return data },
// 	owner: (data) => {
// 		if (!data) return null
// 		const result = data.replace(/[^a-zA-Z]/g, '')
// 		return result
// 	},
// 	type: (mension, type) => {
// 		if (!mension) return null
// 		if (!type) return null
// 		const result = `${mension.toString().replace(/[^\d]/g, '')}${type.toString().replace(/[^\d]/g, '')}`
// 		return result

// 	}
// }

function makeDate(chinaDate: string): string {
	let [day, month] = chinaDate.match(/\d+/g)
	month = (+month - 1).toString()
	dayjs.extend(toObject)
	dayjs.extend(objectSupport)
	dayjs.extend(utc)
	let thisDate = dayjs().toObject()
	let bookingYear = thisDate.years
	let calc = +month - +thisDate.months
	if (calc > 10) {
		bookingYear = +bookingYear - 1
	}
	let dateObject = { years: bookingYear, months: month, date: day, hour: 21, minute: 0, second: 0, millisecond: 0 }
	return dayjs().set(dateObject).utc().toISOString()
}