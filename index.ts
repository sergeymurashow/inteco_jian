import express from 'express'
import dotenv from 'dotenv'
import log4js from 'log4js';
import {router} from './routes/router'
import bodyParser from 'body-parser';


const configPath = {path:'config.env'}
dotenv.config(configPath)


const app = express();
const port = process.env.PORT;
app.use('/api', router)

app.listen(port, () => console.log(`Running on port ${port}`));

