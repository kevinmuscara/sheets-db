const { authorize } = require('./util');
const { google }    = require('googleapis');

class Database {
  constructor(spreadsheetId) {
    console.assert(spreadsheetId, 'spreadsheetId parameter is required');

    this.spreadsheetId = spreadsheetId;
    this.verifyAuth(spreadsheetId);
  }

  verifyAuth = (spreadsheetId) => {
    authorize().then(async(auth) => {
      try {
        const sheets    = google.sheets({ version: 'v4', auth });
        const tableData = await sheets.spreadsheets.values.get({ spreadsheetId, range: 'Users!A2:B' });
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
      await authorize().then(async(auth) => {
        try {
          const sheets    = google.sheets({ version: 'v4', auth });
          const tableData = await sheets.spreadsheets.values.get({ spreadsheetId: this.spreadsheetId, range: 'Users!A2:B' });
          const rows      = tableData.data.values;
        
          if(!rows || rows.length === 0)
            resolve({status: 200, users: [] });
  
          resolve({ status: 200, users: rows.map(([email, password]) => { return { email, password }}) });
        } catch(err) {
          reject({ status: 400, error: 'error in findMany()'});
        }
      });
    });
  }
}

module.exports = Database;