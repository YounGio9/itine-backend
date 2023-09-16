import 'module-alias/register'
import 'dotenv/config'
import validateEnv from '@utils/validateEnv'
import UserController from '@resources/user/user.controller'
import AuthController from '@resources/auth/auth.controller'
import App from './app'
import MessageController from '@resources/message/message.controller'

validateEnv()

const app = new App(
    [new UserController(), new AuthController(), new MessageController()],
    Number(process.env.PORT),
)
app.listen()
