import { Obj } from '../../types/types'
import _ from 'lodash'

export function toIfsum(obj: Obj) {
    return _.toArray( obj ).join(':') + "'"
}

export function getIfsum( input: Obj ) {
    const notParse = ['51']
    let tmp: Obj = {
        data: [],
        set(data: string) {
            this.data.push( data )
        }
    }

    for (let i in input) {
        let value = input[i]
        let chk = notParse.includes(i)
        if (chk) {
            tmp.set(value.join('\n'))
        } else {
            value = toIfsum(value)
            tmp.set(value)
        }
    }
    return tmp.data.join('\n')
}