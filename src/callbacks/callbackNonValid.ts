import dotenv from 'dotenv'
import Axios from 'axios'
import GetConfig from '../../GetConfig'

const { protocol, bpiumUrl, receiver, callbackNonValid} = GetConfig

const url = `${protocol}://${bpiumUrl}${receiver}${callbackNonValid}`

export async function sendNonValid ( data ) {
	console.log( `Callback parsed URL: ${url}` )
	await Axios( { url, method: 'POST', data } ).then((resp) => {
		console.log( `Bookings sended to ${url}` )
	}).catch( err => {
		console.error( JSON.stringify(err, null, 1) )
	})
}