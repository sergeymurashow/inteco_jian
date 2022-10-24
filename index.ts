import express from 'express'
import dotenv from 'dotenv'
import log4js from 'log4js';
import {router} from './routes/router'
import bodyParser from 'body-parser';
import GetConfig from './GetConfig';

const { bpiumUrl, port, callbackParsed, callbackTariff } = GetConfig

const app = express();
app.use('/api', router)

const startMessage = `Running on port ${port}
BPIUM_URL: ${process.env.BPIUM_URL}
CALLBACK_PARSED: ${process.env.CALLBACK_PARSED} 
CALLBACK_TARIFF: ${process.env.CALLBACK_TARIFF} `

app.listen(port, () => console.log(startMessage));

