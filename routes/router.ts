import express from 'express'
import bodyParser from 'body-parser'
import processRunner from '../src/processRunner'

export const router = express.Router()
const jsonParser = bodyParser.json()

router.route('/parse')
	.get((req, res) => {
		res.send({ response: 'It`s works!' })
	})
	.post(jsonParser, (req, res) => {
		processRunner({
			processName: 'documentProcess',
			body: req.body
		})
		res.send( {status: 200} )
	})

