import express from 'express'
import bodyParser from 'body-parser'
import processRunner from '../src/processRunner'
import path from 'path'

export const router = express.Router()
const jsonParser = bodyParser.json()

router.route('/ifsum')
	.get((req, res) => {
		res.send({ response: 'It`s works!' })
	})
	.post(jsonParser, (req, res) => {
		processRunner({
			processName: 'ifsumProcess',
			body: req.body
		}).then( ans => {
			res.send({ status: 200, body: ans })
		}).catch( err => {
			res.send({status: 500, body: err})
		})
	})

	router.route('/parse')
	.get((req, res) => {
		res.send({ response: 'It`s works!' })
	})
	.post(jsonParser, (req, res) => {
		processRunner({
			processName: 'documentProcess',
			body: req.body
		})
		res.send({ status: 200 })
	})

router.route('/containerTariff')
	.post( jsonParser, (req, res) => {
		const chkArr = [ 'voyageData', 'tariffInput' ]
		const body = req.body
		const errRes = []
		for ( let i of chkArr ) {
			if( !body[i] ) errRes.push( i )
		}
		if( errRes.length ) throw res.status(500).send(`Didn't have ${errRes.join(', ')}`)
		processRunner({
			processName: 'tariffProcess',
			body: req.body
		})
		res.send({ status: 200 })
	} )

