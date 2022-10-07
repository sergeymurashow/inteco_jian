import dayjs from "dayjs";
const BP = require('bp-api');

const _ = require('lodash');
const connection = require('../config/default.json').connection;
const bp = new BP(connection.domen, connection.username, connection.password, connection.protocol, 30000);

export default async (params) => {
    runProcess(params).catch((err) => { console.log(err) });
    async function runProcess(params) {
        var name = `${params.processName} ${dayjs().format('DD.MM.YY HH:mm')}`
        console.log(name);
        params.process = await bp.postRecord(47, {
            2: dayjs().toISOString(),
            3: name,
            4: JSON.stringify(params, null, 2),
            6: [1]
        });

        try {
            let script = require(`${__dirname}/${params.processName}`);
            let result = await script(params.body);
            await processComplete(params.process.id, 2, JSON.stringify(result));
        } catch (e) {
            if (e.response) {
                console.log(e.response.data)
                processComplete(params.process.id, 3, e.response.data)
            }
            else {
                console.log(e.stack)
                processComplete(params.process.id, 3, e.stack)
            }

        }
        async function processComplete(processId, resultStatus, resultStr) {
            console.log('processComplete', dayjs().format('DD.MM.YY HH:mm'))
            await bp.patchRecord(47, processId, {
                6: [resultStatus],
                7: dayjs().toISOString(),
                8: resultStr
            })
        }
    }
}


