export function transcribeContractNumber( contractNumber: string ): string {
	const contractTypes = {
		'transit': '00-INL-00-0000'
	}
	const reg = /(\d+)\/ИНЛ-(\d+)-(\d+)/
	const checkType = reg.test( contractNumber )
	switch( checkType ) {
		case true: return contractNumber.replace(reg, '$1-INL-$2-$3')
		break;
		case false: return contractTypes[contractNumber]
	}
}

