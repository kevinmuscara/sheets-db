const { authorize } = require('./util');
const { google }    = require('googleapis');

authorize().then(async(auth) => {
  const sheets = google.sheets({version: 'v4', auth});

  // '<table>!<range>'
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: '',
    range: 'Users!A2:B',
  });
  const rows = res.data.values;
  if (!rows || rows.length === 0) {
    console.log('No data found.');
    return;
  }

  let users = rows.map(([email, password]) => { return { email, password }});
  console.log(users);
});