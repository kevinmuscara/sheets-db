const { authorize } = require('./util');
const { google }    = require('googleapis');

class Database {
  constructor(spreadsheetId, PATH_TO_CREDS) {
    console.assert(spreadsheetId, `'spreadsheetId' parameter is required`);
    console.assert(PATH_TO_CREDS, `'PATH_TO_CREDS' parameter is required`);

    this.id    = spreadsheetId;
    this.creds = PATH_TO_CREDS;

    this.verifyAuth();
  }

  verifyAuth = () => {
    authorize(this.creds).then(async(auth) => {
      try {
        const sheets    = google.sheets({ version: 'v4', auth });
        const tableData = await sheets.spreadsheets.values.get({ spreadsheetId: this.id, range: 'Users!A2:B' });
        const rows      = tableData.data.values;
      
        if(!rows || rows.length === 0)
          return console.log('No data in table.');
    
        if(typeof rows === 'object' && Array.isArray(rows) && rows !== null)
          console.log(`Authentication verified.`);
        else 
          console.error(`Error verifiying authentication`);
      } catch(err) {
        console.error(`Error verifiying authentication.`);
      }
    });
  }

  findMany = () => {
    return new Promise(async(resolve, reject) => {
      await authorize(this.creds).then(async(auth) => {
        try {
          const sheets    = google.sheets({ version: 'v4', auth });
          const tableData = await sheets.spreadsheets.values.get({ spreadsheetId: this.id, range: 'Users!A2:B' });
          const rows      = tableData.data.values;
        
          if(!rows || rows.length === 0)
            resolve({status: 200, users: [] });
  
          resolve({ status: 200, users: rows.map(([email, password]) => { return { email, password }}) });
        } catch(err) {
          reject({ status: 400, error: `error in 'findMany()'`});
        }
      });
    });
  }

  findFirst = (options = {}) => {
    console.assert(options, `'options' parameter required.`);

    return new Promise(async(resolve, reject) => {
      await authorize(this.creds).then(async(auth) => {
        try {
          const sheets    = google.sheets({ version: 'v4', auth });
          const tableData = await sheets.spreadsheets.values.get({ spreadsheetId: this.id, range: 'Users!A2:B' });
          const rows      = tableData.data.values;
        
          if(!rows || rows.length === 0)
            resolve({status: 200, user: {} });

          let users = rows.map(([email, password]) => { return { email, password }});
          let user = users.filter(function(obj) {
            return Object.keys(options).every(function(prop) {
              return obj[prop] === options[prop];
            });
          })[0];

          resolve({ status: 200, user });
        } catch(err) {
          reject({ status: 400, error: `error in 'findFirst()'`});
        }
      });
    });
  }
}

module.exports = Database;