import {google} from "googleapis";
const path = require("path")
const fs =require("fs")
const REDIRECT_URI = "https://developers.google.com/oauthplayground/";

const oAuth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_ID,
    process.env.GOOGLE_SECRET,
    REDIRECT_URI,
)

oAuth2Client.setCredentials({refresh_token:process.env.GOOGLE_DRIVE_REFRESH_TOKEN})

export const drive = google.drive({
    version:"v3",
    auth:oAuth2Client
})

