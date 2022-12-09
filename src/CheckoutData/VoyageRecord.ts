import { Any } from "src/DocsParse/classes/IfsumParser";
import { VoyageLink } from "./types";

const BP = require('bp-api');
const connection = require('../config/default.json').connection;

const bp = new BP(connection.domen, connection.username, connection.password, connection.protocol, 30000);


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

		const result = await bp.getRecords( '139', {filters} )

		return result
	}

	async getVoyageRecordId(): Promise<VoyageLink[]> {
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