import express from 'express'
import dotenv from 'dotenv'
import log4js from 'log4js';
import {router} from './routes/router'
import bodyParser from 'body-parser';


const configPath = {path:'config/config.env'}
dotenv.config(configPath)


const app = express();
const port = process.env.PORT;
app.use('/api', router)

const startMessage = `Running on port ${port}
URL: ${process.env.URL}
CALLBACKURL: ${process.env.CALLBACKURL} 
CALLBACKTARIFF: ${process.env.CALLBACKTARIFF} `

app.listen(port, () => console.log(startMessage));

