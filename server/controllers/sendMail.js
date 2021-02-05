const nodemailer = require('nodemailer')
const { google } = require('googleapis')
const { OAuth2 } = google.auth
const OAUTH_PLAYGROUND = 'https://developers.google.com/oauthplayground'

const {
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    MAILING_REFRESH_TOKEN,
    SENDER_EMAIL_ADDRESS
} = process.env

const oauth2Client = new OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    MAILING_REFRESH_TOKEN,
    SENDER_EMAIL_ADDRESS
)

const sendMail = (to, url, txt) =>{
    oauth2Client.setCredentials({
        refresh_token:  MAILING_REFRESH_TOKEN
    })

    const accessToken = oauth2Client.getAccessToken()
    const smtpTransport = nodemailer.createTransport({
        service: 'gmail',
        auth:{
            type: "oAuth2",
            user: SENDER_EMAIL_ADDRESS,
            clientId: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            refreshToken: MAILING_REFRESH_TOKEN,
            OAUTH_PLAYGROUND
        }
    })

    const mailOptions = {
        from: SENDER_EMAIL_ADDRESS,
        to: to,
        subject: 'Email',
        html: `<a style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;" href=${url}>${txt}</a>`
    }
    smtpTransport.sendMail(mailOptions, (err, info) =>{
        if(err) return err;
        return info;
    })

}

module.exports = sendMail