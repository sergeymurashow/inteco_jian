import utils from "../../utils"

export const gWeight = ( data: string ): string => {
	if( !data ) {
		return null
	}
	return data.replace(/[^\d,.]/, '')
}

export const contract = ( data: string ) => {
	return utils.transcribeContractNumber(utils.clearString(data)).answer
}	