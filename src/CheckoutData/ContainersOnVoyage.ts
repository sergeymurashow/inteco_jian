import { Filters, VoyageLink } from "./types"

const BP = require('bp-api');
const connection = require('../../config/default.json').connection;

const bp = new BP(connection.domen, connection.username, connection.password, connection.protocol, 30000);


interface ContainersOnVoyage {
	voyageLink: VoyageLink[]
}

class ContainersOnVoyage{
	constructor( voyageLink: VoyageLink[] ) {
		this.voyageLink = voyageLink
	}
	
	async getContainers() {
		const filters: Filters = [
			{
				fieldId: '31',
				value: this.voyageLink
			},
			{
				fieldId: '23',
				value: ['1']
			}
		]
		const limit = '1000'
		const result = await bp.getRecords( '108', {filters, limit})
		// console.log( JSON.stringify( result, null, 1 ))
		return result
	}

}

export default ContainersOnVoyage