import _, { LoDashStatic } from 'lodash'
import dayjs from 'dayjs'
import BP from 'bp-api'
import connectionParams from '../config/default'
import { AxiosResponse } from 'axios';

const bp = new BP(
	connectionParams.connection.domen,
	connectionParams.connection.username,
	connectionParams.connection.password,
	connectionParams.connection.protocol,
	30000);


export default interface Run {
	body: { [key: string]: string }
	process: { [key: string]: string }
	func(params)
	processName?: string
}

export default class Run {
	constructor({ processName, body, func }) {
		this.body = body
		this.processName = processName
		this.func = func
	}

	async startProcess() {
		this.process = await bp.postRecord(47, {
			2: dayjs().toISOString(),
			3: this.processName,
			4: JSON.stringify(this.body, null, 2),
			6: [1]
		})
	}

	async run(func = this.func) {
		await this.startProcess()
		this.func(this.body)
			.then(async resp => {
				await this.endProcess({
					processId: this.process.id,
					resultStatus: 2,
					resultStr: JSON.stringify(resp)
				})
			})
			.catch(async err => {
				console.error(err)
				return
				await this.endProcess({
					processId: this.process.id,
					resultStatus: 3,
					resultStr: JSON.stringify(err.stack)
				})
			})
	}

	async endProcess({ processId, resultStatus, resultStr }) {
		console.log('processComplete', dayjs().format('DD.MM.YY HH:mm'))
		await bp.patchRecord(47, processId, {
			6: [resultStatus],
			7: dayjs().toISOString(),
			8: resultStr
		})
	}
}