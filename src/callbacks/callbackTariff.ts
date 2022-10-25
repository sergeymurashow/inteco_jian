import dotenv from 'dotenv'
import Axios from 'axios'
import GetConfig from '../../GetConfig'

const { protocol, bpiumUrl, receiver, callbackTariff} = GetConfig

const url = `${protocol}://${bpiumUrl}${receiver}${callbackTariff}`

export async function sendTariff ( data ) {
	console.log( `Callback tariff URL: ${url}` )
	await Axios( { url, method: 'POST', data } ).then((resp) => {
		console.log( `Tariff sended to ${url}` )
	}).catch( err => {
		console.error( JSON.stringify(err, null, 1) )
	})
}