export type Obj = {
	[key: string | number]: any
	set?(data: Obj): void
	get?(): any
}

export type Params = {
	fileName: string
	test?: Params
}

export type Booking = {
	bookingId: string,
	voyageNumber?: string,
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
}

export type Container = {
	mension: string,
	cType: string,
	vol: string,
	number: string,
	seal: string,
	packages: string,
	gWeight: string,
	tWeight: string,
	cbm: string,
	freight: string,
	owner: string
}

export type Contract = {
	bookingId: string,
	contract: string
}