import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

const testAccount = {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
}
const smtpService = process.env.MAIL_SERVICE

const transporter = nodemailer.createTransport({
    service: smtpService,
    auth: {
        user: testAccount.user,
        pass: testAccount.pass,
    },
})

export default transporter
