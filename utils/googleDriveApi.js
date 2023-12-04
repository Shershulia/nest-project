import {google} from "googleapis";

const auth = new google.auth.GoogleAuth({
    // your credentials to authenticate
    keyFile: process.cwd() + "/credentials-for-google-drive.json",
    // the actions you are permissed to perform using this API, in this case
    // all CRUD operations are permissed, check out
    // [ https://developers.google.com/drive/api/guides/api-specific-auth ]
    // for more advice on scopes
    scopes: ["https://www.googleapis.com/auth/drive"],
})
export const GoogleDrive = google.drive({
    version: "v3",
    auth
});