import Handlebars from 'handlebars'
import logger from '@/config/logger'
import transporter from '../nodemailer.util'
import readHtmlFile from '../fileReader.util'

export default async function SendMessageByAdminMail(
    subject: string,
    message: string,
    email: string,
): Promise<void> {
    readHtmlFile('./src/views/mails/messageAdmin.html', (err: any, html: any) => {
        if (err) {
            logger.error(err)

            return err
        }
        const template = Handlebars.compile(html)
        const replacements = { subject, message }
        const htmlToSend = template(replacements)

        const mailOptions = {
            from: '"Itine" <foo@example.com>',
            to: email,
            subject,
            html: htmlToSend,
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                logger.error(err)
                return error
            }
            return {
                name: info.response,
            }
        })
    })
}
