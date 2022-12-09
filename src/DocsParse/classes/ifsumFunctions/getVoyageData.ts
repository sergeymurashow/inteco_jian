import { Any } from "../IfsumParser";

type GetVoyageData = {
	voyageNumber: string
}

function getVoyageData( input: string ): GetVoyageData {
	const rawData = input.split(':')
	const {
		4: voyageNumber
	} = rawData
	return { voyageNumber }
}

export default getVoyageData