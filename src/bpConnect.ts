const BP = require('bp-api');
const connection = require('../../config/default.json').connection;
console.log( 'Trying to connect to Bpium')
const bpiumConnect  = new BP(connection.domen, connection.username, connection.password, connection.protocol, 30000);
console.log( 'Bpium is connected', bpiumConnect)

export default bpiumConnect