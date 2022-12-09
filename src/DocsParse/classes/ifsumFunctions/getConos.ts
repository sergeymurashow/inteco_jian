import { Any } from "../IfsumParser";

type GetConos = {
	bookingId: string, 
	loadPort: string
}

function getConos( input: string ): GetConos {
	const rawData = input.split(':')
	const  {
		1: bookingId,
		8: loadPort,
	 } = rawData
	 return { bookingId, loadPort }
}

export default getConos