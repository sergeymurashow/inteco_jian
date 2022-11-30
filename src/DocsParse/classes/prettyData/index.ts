import utils from "../../utils"

export const gWeight = ( data: string | number ): string => {
	if( !data ) {
		return null
	}
	if( typeof data === 'number' ) data = data.toString()
	return data.replace(/[^\d,.]/, '')
}

export const contract = ( data: string ) => {
	return utils.transcribeContractNumber(utils.clearString(data)).answer
}	