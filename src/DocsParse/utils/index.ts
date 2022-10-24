import fixVoyageNumber from "./fixVoyageNumber";
import transcribeContractNumber from "./transcribeContractNumber";
import clearString from "./clearString";
import { createCatalogs } from '../../utils/createCatalogs'
import { sendParsed } from '../../callbacks/callbackParsedDocs'
import { downloadFiles } from '../../utils/downloadFiles'

export default {
	fixVoyageNumber,
	transcribeContractNumber,
	clearString,
	createCatalogs,
	sendParsed,
	downloadFiles
}
