const connection = require('../../config/default.json').connection;
const BP = require('bp-api');
const bp = new BP(connection.domen, connection.username, connection.password, connection.protocol, 30000);
const mime = require('mime')
import path from 'path'
import { record } from 'src/types';

export async function uploadFile(filePath: string, record: record) {
	const mimeType = mime.getType(filePath)
	const fileName = path.parse(filePath).base
	const fileKeys = await bp.getUploadFileKeys(fileName, mimeType)
	const uploadedFile = await bp.uploadFile( fileKeys, )
	return fileKeys
}


(async () => {
	let fileKeys = await uploadFile('/adsf/asdf/test.txt', { catalogId: '31', recordId: '12' })

	console.log( JSON.stringify( fileKeys, null, 1))
})()

