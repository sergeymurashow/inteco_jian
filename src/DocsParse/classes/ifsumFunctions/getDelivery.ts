import { Any } from "../IfsumParser";

function getDelivery( input: string ): Any {
	const rawData = input.split(':')
	const  {4: deliveryPort} = rawData
	return { deliveryPort }
}

export default getDelivery