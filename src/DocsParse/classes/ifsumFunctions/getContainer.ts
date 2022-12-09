import { Any } from "../IfsumParser";

function getContainer( input: string ): Any {
	const rawData = input.split(':')
	const {
		2: containerId,
		3: seal
 } = rawData
	return { containerId, seal }
}

export default getContainer