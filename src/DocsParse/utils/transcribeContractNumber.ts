import answerTemplate from "../../utils/answerTemplate"

export default function transcribeContractNumber(contractNumber: string): any {
	if (!contractNumber) return answerTemplate({ err: 'Empty contract number!' })
	const contractTypes = {
		'transit': '00-INL-00-0000'
	}
	const reg = /(\d{2})[- \/]*?[a-zA-Zа-яА-Я]{3}[- \/]*?(\d+)[- \/]*?(\d{4})/ ///(\d+)\/ИНЛ-(\d+)-(\d+)/
	const checkType = reg.test(contractNumber)
	if (!checkType) {
		try {

			return contractNumber.length ? contractNumber.toUpperCase() : null

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

function replacer(arr: Array<any>): string {
	if (arr.length !== 4) return answerTemplate({ err: 'Empty contract number!' }).err
	const [match, one, two, three] = arr
	return `${one}-INL-${two}-${three}`
}


// let t = transcribeContractNumber( '№04INL-20-2022' )
let t = transcribeContractNumber( 'Transit' )

console.log( t )