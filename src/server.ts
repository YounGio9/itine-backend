import 'module-alias/register'
import 'dotenv/config'
import validateEnv from '@utils/validateEnv'
import UserController from '@resources/user/user.controller'
import AuthController from '@resources/auth/auth.controller'
import SizeController from '@resources/size/size.controller'
import CityController from '@resources/city/city.controller'
import ColorController from '@resources/color/color.controller'
import MessageController from '@resources/message/message.controller'
import ProductController from '@resources/product/product.controller'
import CategoryController from '@resources/category/category.controller'
import DeliveryManController from '@resources/deliveryMan/deliveryMan.controller'
import App from './app'

validateEnv()

const app = new App(
    [
        new UserController(),
        new AuthController(),
        new MessageController(),
        new ProductController(),
        new CategoryController(),
        new ColorController(),
        new SizeController(),
        new CityController(),
        new DeliveryManController(),
    ],
    Number(process.env.PORT),
)
app.listen()
