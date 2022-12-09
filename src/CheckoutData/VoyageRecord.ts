import { Any } from "src/DocsParse/classes/IfsumParser";
import { VoyageLink } from "./types";
import bp from '../bpConnect'

interface VoyageRecord{
	record: Any[]
	voyageNumber: string
}

class VoyageRecord{
	constructor( voyageNumber: string ) {
		this.voyageNumber = voyageNumber
	}

	private async getRecord()  {
		const filters = [
			{
				fieldId: 4,
				value: this.voyageNumber
			}
		]
		
		console.log( `Get voyage record by filter: ${JSON.stringify( filters, null, 1)}`)
		const result = await bp.getRecords( '139', {filters} )

		return result
	}

	async getVoyageRecordId(): Promise<VoyageLink[]> {
		console.log( 'Get voyage')
		const record = await this.getRecord()
		return record.map(m => {
			let { id: recordId, catalogId } = m;
			return {
				catalogId,
				recordId
			};
		})
	}
}

export default VoyageRecord