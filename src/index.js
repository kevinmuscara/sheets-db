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

  verifySchemaFormat = (schema) => {
    console.assert(schema, `'schema' parameter is required`);

    if(!schema.name)
      return false;

    if(!schema.properties)
      return false;

    return true;
  }

  createNewTable = (schema) => {
    console.assert(schema, `'schema' parameter is required`);

    if(!(this.verifySchemaFormat(schema))) {
      console.error(`Schema format is incorrect.`); 
      return;
    } else {
      const { name, properties } = schema;

      const request = {
        spreadsheetId: this.id,
        resource: {
          requests: [{
            addSheet: {
              properties: {
                title: name
              }
            }
          }]
        }
      }

      authorize(this.creds).then(async(auth) => {
        try {
          google.sheets({ version: 'v4', auth }).spreadsheets.batchUpdate(request, (err, response) => {
            if(err) 
              console.error(err);
            else 
              if(response.status === 200)
                return true
          });
        } catch(err) {
          console.error(err);
        }
      });
    }
  }

  addSchemas = (schemas) => {
    console.assert(schemas, `'schemas' parameter is required`);

    authorize(this.creds).then(async(auth) => {
      try {
        const sheets    = google.sheets({ version: 'v4', auth });
        const tableData = await sheets.spreadsheets.get({ spreadsheetId: this.id, includeGridData: false });
      
        for(let i = 0; i < schemas.length; i++) {
          if(tableData.data.sheets.some((sheet) => sheet.properties.title === schemas[i].name))
            console.log(`${schemas[i].name} table already exists, skipping.`);
          else {
            this.createNewTable(schemas[i]);
          }
        }

      } catch(err) {
        console.error(err);
      }
    }); 
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

  findFirst = (options) => {
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
            return Object.keys(options).every((prop) => { return obj[prop] === options[prop] });
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