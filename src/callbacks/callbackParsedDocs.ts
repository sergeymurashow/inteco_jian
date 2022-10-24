import dotenv from 'dotenv'
import Axios from 'axios'
import GetConfig from '../../GetConfig'

const { bpiumUrl, receiver, callbackParsed} = GetConfig


const url = `${bpiumUrl}${receiver}${callbackParsed}`

export async function sendParsed ( data ) {
	
	await Axios( { url, method: 'POST', data } ).then((resp) => {
		console.log( resp )
	}).catch( err => {
		console.error( JSON.stringify(err, null, 1) )
	})
}