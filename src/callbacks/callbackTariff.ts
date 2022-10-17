import dotenv from 'dotenv'
import Axios from 'axios'

const configPath = {path:'config/config.env'}
dotenv.config(configPath)

const url = `${process.env.URL}${process.env.CALLBACKTARIFF}`

export async function sendTariff ( data ) {
	
	await Axios( { url, method: 'POST', data } ).then((resp) => {
		console.log( resp )
	}).catch( err => {
		console.error( JSON.stringify(err, null, 1) )
	})
}

// sendParsed( 'manifest', {test: 'test'})