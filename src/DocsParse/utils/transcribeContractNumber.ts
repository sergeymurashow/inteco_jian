import answerTemplate from "../../utils/answerTemplate"

export default function transcribeContractNumber(contractNumber: string): any {
	if (!contractNumber) return answerTemplate({ err: 'Empty contract number!' })
	const contractTypes = {
		'transit': '00-INL-00-0000'
	}
	const reg = /(\d+)/g ///(\d{2})[- \/]*?[a-zA-Zа-яА-Я]{3}[- \/]*?(\d+)[- \/]*?(\d{4})/ ///(\d+)\/ИНЛ-(\d+)-(\d+)/
	const checkType = reg.test(contractNumber)
	if (!checkType) {
		try {

			return contractNumber.length ? 
			answerTemplate( { answer: contractNumber }) : 
			null

		} catch (e) {

			return answerTemplate({ err: { msg: 'Wrong type!', desc: e } })

		}
	}
	let matchedNumber = contractNumber.match(reg)
	return answerTemplate({ answer: replacer(matchedNumber) })

	// switch (checkType) {
	// 	case true: return answerTemplate({ answer: replacer(matchedNumber) })
	// 		break;
	// 	case false: return contractTypes[contractNumber] ? contractTypes[contractNumber] : answerTemplate({ err: 'Empty contract number!' })
	// }
}

// function replacer(arr: Array<any>): string {
// 	if (arr.length !== 4) return answerTemplate({ err: 'Empty contract number!' }).err
// 	const [match, one, two, three] = arr
// 	return `${one}-INL-${two}-${three}`
// }

function replacer(arr: Array<any>): string {
	return `${arr[0]}-INL-${arr.slice(1).join('-')}`
}


// let t = transcribeContractNumber( '05 InL-78-1-2022' )
// let t = transcribeContractNumber( 'Tetra' )

// console.log( t )