import dayjs from "dayjs"
import { Obj } from "src/types"

export const ifsumData =
{
	getFileFunction(ffName: string ) {
		enum ff {
			original = 9,
			additional = 2,
			deleted = 3,
			amended = 4
		}

		return ff[ffName]
	},

	getFileCreateTime() {
		return dayjs().format('YYMMDDHHMM')
	},

	getVesselCode(vessel:Obj ) {
		
	},
	getVessel(vessel:Obj) {

	},

	getVoyage() {

	},

	getSalingDate() {

	},
	getDepartPortCode() {

	},
	getDepartCode() {

	},

	getQuantityNumberOfContainer() {

	}
}