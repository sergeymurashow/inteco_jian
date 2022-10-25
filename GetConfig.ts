import { timeStamp } from 'console'
import dotenv from 'dotenv'
const configPath = process.env.CONFIG || '../config/config.env'
// const configPath = process.env.CONFIG || '../config/test.env'

console.log( configPath )

interface GetConfig{
	port: string
	protocol: string
	bpiumUrl: string
	receiver: string
	callbackParsed: string
	callbackTariff: string
}

class GetConfig{
	constructor(configPath) {
		dotenv.config({path: configPath})
		this.port = process.env.PORT
		this.protocol = process.env.PROTOCOL
		this.bpiumUrl = process.env.BPIUM_URL
		this.receiver = process.env.RECEIVER
		this.callbackParsed = process.env.CALLBACK_PARSED
		this.callbackTariff = process.env.CALLBACK_TARIFF
	}
}

export default new GetConfig(configPath)
