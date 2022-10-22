import dotenv from 'dotenv'
import Axios from 'axios'

type DocTypesList = 'manifest' | 'declaration' | 'contracts'

const configPath = {path:'config/config.env'}
dotenv.config(configPath)

const url = `${process.env.URL}${process.env.CALLBACKURL}`

export async function sendParsed ( data ) {
	
	await Axios( { url, method: 'POST', data } ).then((resp) => {
		console.log( resp )
	}).catch( err => {
		console.error( JSON.stringify(err, null, 1) )
	})
}