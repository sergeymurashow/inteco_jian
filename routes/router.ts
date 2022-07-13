import express from 'express'
import bodyParser from 'body-parser'
import {downloadFiles} from '../src/downloadFiles'

export const router = express.Router()
const jsonParser = bodyParser.json()

router.route('/parse')
	.get((req, res) => {
		res.send({response: 'It`s works!'})
	})
	.post(jsonParser, (req, res) => {
		downloadFiles( req.body )
		res.send( {status: 200} )
	})

