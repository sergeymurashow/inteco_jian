// let test = {
// 	'a': 'HS Code',
// 	'b': 'H.S. Code',
// 	'c': 'HS'
// }

// let reg = /H.*?S.*?(Code)*/

// let t1 = test.a.match( reg )
// let t2 = test.b.match( reg )
// let t3 = test.c.match( reg )

import dotenv from 'dotenv'
import Axios from 'axios'
// import { collect } from '../files/collect'
import dayjs, { Dayjs } from 'dayjs'

let t = dayjs().toISOString()

let r