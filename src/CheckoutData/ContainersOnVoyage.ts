import { Filters, VoyageLink } from "./types"
import bp from '../bpConnect'

interface ContainersOnVoyage {
	voyageLink: VoyageLink[]
}

class ContainersOnVoyage{
	constructor( voyageLink: VoyageLink[] ) {
		this.voyageLink = voyageLink
	}
	
	async getContainers() {
		console.log( 'Get containers')
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
		console.log( 'Get by filters:', filters)
		const limit = '1000'
		const result = await bp.getRecords( '108', {filters, limit})
		// console.log( JSON.stringify( result, null, 1 ))
		return result
	}

}

export default ContainersOnVoyage