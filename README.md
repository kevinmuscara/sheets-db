# sheets-db
Using google sheets as database

## Enable the API

Before using Google APIs, you need to turn them on in a Google Cloud project. You can turn on one or more APIs in a single Google Cloud project.

* In the Google Cloud console, enable the Google Sheets API. [Click here to Enable the API](https://console.cloud.google.com/flows/enableapi?apiid=sheets.googleapis.com)

## Authorize credentials for a desktop application

* To authenticate as an end user and access user data in your app, you need to create one or more OAuth 2.0 Client IDs. A client ID is used to identify a single app to Google's OAuth servers. If your app runs on multiple platforms, you must create a separate client ID for each platform.

* In the Google Cloud console, go to `Menu > APIs & Services > Credentials`.
* Click `Create Credentials > OAuth client ID`.
* Click `Application type > Desktop app`.
* In the `Name` field, type a name for the credential. This name is only shown in the Google Cloud console.
* Click `Create`. The OAuth client created screen appears, showing your new `Client ID` and `Client secret`.
* Click `OK`. The newly created credential appears under `OAuth 2.0 Client IDs`.
* Save the downloaded JSON file as `credentials.json`, and move the file to your working directory.

# Limitations

* The maximum number of cells per sheet is 2 million.
* The maximum number of columns per sheet is 18,278.
* The maximum number of sheets per workbook is 400.

# MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
