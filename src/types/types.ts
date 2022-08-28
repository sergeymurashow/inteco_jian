export type Obj = {
	[key: string | number]: any
	set?(data: Obj | string): void
	get?(): any
}

export type Params = {
	fileName: string,
	voyage: Array<record>
}

export interface Booking {
	bookingId: string,
	voyageNumber?: Array<record>,
	pkgs?: string,
	packType?: string,
	gWeight?: string,
	desc?: string,
	shipper?: string,
	consignee?: string,
	notifyParty?: string,
	mark?: string,
	hs?: string | null,
	containers?: Array<Container>
	contract?: string,
	owner?: string,
	type?: string,
	freight?: string,
	isManifest?: Array<number>
}

export interface BookingAccounting extends Booking {
	sum: string
}

export type Container = {
	vol?: string,
	number: string,
	seal?: string,
	packages?: string,
	gWeight?: string,
	tWeight?: string,
	cbm?: string,
	freight?: string,
	owner?: string,
	type?: string
}

export type Contract = {
	bookingId: string,
	contract: string
}

export type recordValues = Obj

export type linkFieldFromBpium = {
	"sectionId": string,
	"catalogId": string,
	"catalogTitle": string,
	"catalogIcon": string,
	"recordId": string,
	"recordTitle": string,
	"recordValues": recordValues,
	"isRemoved": boolean
}

export type linkFieldsFromBpium = Array<linkFieldFromBpium>

export type voyageFromBpium = {
	"2": string,
	"3": Array<Obj>,
	"9": Array<linkFieldFromBpium>,
	"16": Array<Obj>,
	"17": string,
	"18": string,
	"20": Array<Obj>,
	"21": string,
	"22": string,
	"25": Array<Obj>,
	"30": string,
	"33": Array<Obj>,
	"34": Array<Obj>
}

export type containerFieldFromBpium = {
	"2": string,
	"3": number,
	"4": number,
	"6": string
	"7": number,
	"8": string,
	"10": number,
	"11": number,
	"15": Array<any>
}

export type containerFieldsFromBpium = Array<containerFieldFromBpium>

export type bookingFromBpium = {
	"5": string,
	"16": string,
	"39": Array<any>,
	"63": Array<any>,
	"91": Array<linkFieldFromBpium>,
	"108": string,
	"109": string,
	"110": string,
	"116": Array<any>,
	"118": Array<any>,
	"119": any,
	"120": string,
	"123": any,
	"128": Array<any>,
	"130": Array<any>,
	"132": Array<any>,
	"133": any,
	"135": any,
	"136": any,
	"137": Array<any>,
	"138": Array<any>,
	"139": any,
	"140": string,
	"142": Array<any>,
	"144": Array<linkFieldFromBpium>,
	"145": any,
	"146": any,
	"147": any,
	"148": any,
	"149": string,
	"152": string,
	"153": string,
	"154": string,
	"156": Array<any>,
	"157": Array<any>
}

export type bookingsFromBpium = Array<bookingFromBpium>

export type port = {
	port: string,
	code: string
}


export type record = {
	catalogId: string,
	recordId: string
}