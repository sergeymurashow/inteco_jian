import express from 'express'
import bodyParser from 'body-parser'
import processRunner from '../src/processRunner'
import path from 'path'

import Run from '../src/testProcessRunner'
import documemtProcess from '../src/documentProcess'

export const router = express.Router()
const jsonParser = bodyParser.json()

router.route('/test/parse')
	.get((req, res) => {
		res.send({ response: 'It`s works!' })
	})
	.post(jsonParser, (req, res) => {
		try {
			new Run({
				processName: 'documentProcess',
				body: req.body,
				func: documemtProcess
			}).run()
			res.send({ status: 200 })
		} catch (e) {
			res.send({ status: 500, message: JSON.stringify(e.stack, null, 1) })
		}
	})


