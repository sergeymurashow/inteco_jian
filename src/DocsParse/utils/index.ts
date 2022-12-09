import fixVoyageNumber from "./fixVoyageNumber";
import transcribeContractNumber from "./transcribeContractNumber";
import clearString from "./clearString";
import { createCatalogs } from '../../utils/createCatalogs'
import { sendParsed } from '../../callbacks/callbackParsedDocs'
import { sendNonValid } from "../../callbacks/callbackNonValid";
import { downloadFiles } from '../../utils/downloadFiles'

export default {
	fixVoyageNumber,
	transcribeContractNumber,
	clearString,
	createCatalogs,
	sendParsed,
	sendNonValid,
	downloadFiles
}
