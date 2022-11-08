import { Headers } from "../classes/things/types"

// let str = [{
// 	BLNO: "sdlfkjsdkjf",
// 	PKGS: "XIN LONG YUN 55I07N55",
// 	GOODS: "DISCH PORT",
// 	SHIPPER: "VOSTOCHNY,RUSSIA",
// 	CONTAINERNO: "LOADING PORT",
// 	SEAL: "NINGBO,CHINA",
// }, {
// 	BLNO: "SHIP NAME VOYAGE",
// 	QWEQWEwq: '',
// 	PKGS: "XIN LONG YUN 55I07N55",
// 	GOODS: "DISCH PORT",
// 	SHIPPER: "VOSTOCHNY,RUSSIA",
// 	CONTAINERNO: "LOADING PORT",
// 	SEAL: "NINGBO,CHINA",
// }]

const regs = {
	shipnameReg: new RegExp(/SHIP\s*NAME\s*VOYAGE/),
	dischPortReg: new RegExp(/DISCH\s*PORT/),
	loadingPortReg: new RegExp(/LOADING\s*PORT/)
}

function findVoyageString(str: Headers.Manifest[]): Headers.Manifest {
	return str.find(fi => {
		let fiStr = Object.values(fi).join(' | ')
		return regs.shipnameReg.test(fiStr)
	})
}

function getValueByReg(strObj: Headers.Manifest, reg: RegExp): string {
	let tmp: string
	for (let i in strObj) {
		let value: string = strObj[i]
		if (reg.test(value)) {
			tmp = i
		}
		else if (value && value.length && tmp) {
			return value
		}
	}
}

interface manifestGetVoyagePort {
	table: Headers.Manifest
}

interface manifestGetVoyagePortOut {
	vesselVoyage: string
	portCountry: string
	loadingPort: string
}


/**
 * 
 * @param table Parsed table in Type Headers.Manifest
 * @return vesselVoyage and portCountry
 * 
 */
export default function manifestGetVoyagePort(table: Headers.Manifest[]): manifestGetVoyagePortOut {
	const stringWithShipname = findVoyageString(table)
	const vesselVoyage = getValueByReg(stringWithShipname, regs.shipnameReg)
	const portCountry = getValueByReg(stringWithShipname, regs.dischPortReg)
	const loadingPort = getValueByReg(stringWithShipname, regs.loadingPortReg)
	return {
		vesselVoyage,
		portCountry,
		loadingPort
	}
}


