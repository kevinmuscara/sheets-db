const Database = require('../index');
const path     = require('path');

const CREDENTIALS_PATH = path.join(process.cwd(), 'creds.json');
const db               = new Database('1gnnHyD7tLAJJsa4AunvokC6qbjNvRAK7vFAdzBiQX6Y', CREDENTIALS_PATH);

db.findMany().then(res => console.log(res));
db.findFirst({ email: 'muscarak1@nku.edu' }).then(res => console.log(res));
db.findFirst({ password: '123' }).then(res => console.log(res));