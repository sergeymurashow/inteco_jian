import { downloadFiles } from './utils/downloadFiles'
import { manifestParser, contractAndBookingParser } from './DocsParse/parseExcel'
import { createCatalogs } from './utils/createCatalogs'
import { mergeByBookingId } from './mergeByBookingId'
import { sendParsed } from './callbacks/callbackParsedDocs'
import { Obj } from './types/types'
import Path from 'path'
import Fs from 'fs'

import { getTariff } from './TariffCalculate/getTariff'


async function tariffProcess( {voyageData, tariffInput, contractData} ) {
	await getTariff( {voyageData, tariffInput, contractData} )
}

module.exports = tariffProcess