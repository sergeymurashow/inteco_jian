class ManifestContainError extends Error {
	groupName: string
	constructor(msg: string) {
		super(msg)
		this.groupName = 'Manifest contain Error'
		Object.setPrototypeOf(this, ManifestContainError)
		console.group(this.groupName)
		console.error(msg)
		console.error(this.stack)
		console.groupEnd()
	}
}

class ManifestContainersContainError extends ManifestContainError{
	constructor(options) {
		super(options)
		this.groupName = 'Containers contain Error'
	} 
}

export const manifestFields = {
	bookingId: (data) => { return data },
	voyageNumber: (data) => { return data },
	pkgs: (data) => { return data },
	packType: (data) => { return data },
	gWeight: (data) => { return data },
	desc: (data) => { return data },
	shipper: (data) => { return data },
	consignee: (data) => { return data },
	notifyParty: (data) => { return data },
	mark: (data) => { return data },
	owner: (data) => {
		if (!data) return null
		const result = data.replace(/[^a-zA-Z]/g, '')
		return result
	},
	type: (mension, type) => {
		if (!mension) return null
		if (!type) return null
		const result = `${mension.toString().replace(/[^\d]/g, '')}${type.toString().replace(/[^\d]/g, '')}`
		return result

	},
	// hs: data.K ? data.K.replace(/\t+/g, '') : data.K,
	freight: (data) => { return data },
	isManifest: (data) => { return data },
	docType: (data) => { return data }
}

export const containerFields = {
	vol: (data) => { return data },
	number: (data) => { return data },
	seal:(data) => { return data },
	packages: (data) => { return data },
	gWeight: (data) => { return data },
	tWeight: (data) => { return data },
	cbm: (data) => { return data },
	freight: (data) => { return data },
	owner: (data) => {
		if (!data) return null
		const result = data.replace(/[^a-zA-Z]/g, '')
		return result
	},
	type: (mension, type) => {
		if (!mension) return null
		if (!type) return null
		const result = `${mension.toString().replace(/[^\d]/g, '')}${type.toString().replace(/[^\d]/g, '')}`
		return result

	}
}