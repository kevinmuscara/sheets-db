const Database = require('../index');

const db = new Database('1gnnHyD7tLAJJsa4AunvokC6qbjNvRAK7vFAdzBiQX6Y');

db.findMany().then(res => console.log(res));