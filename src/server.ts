import 'module-alias/register'
import 'dotenv/config'
import validateEnv from '@utils/validateEnv'
import UserController from '@resources/user/user.controller'
import AuthController from '@resources/auth/auth.controller'
import CityController from '@resources/city/city.controller'
import MessageController from '@resources/message/message.controller'
import ProductController from '@resources/product/product.controller'
import CartItemController from '@resources/cartItem/cartItem.controller'
import CategoryController from '@resources/category/category.controller'
import DeliveryManController from '@resources/deliveryMan/deliveryMan.controller'
import WishListItemController from '@resources/wishListItem/wishListItem.controller'
import OrderItemController from '@resources/orderItem/orderItem.controller'
import App from './app'

validateEnv()

const app = new App(
    [
        new UserController(),
        new AuthController(),
        new MessageController(),
        new ProductController(),
        new CategoryController(),
        new CityController(),
        new DeliveryManController(),
        new CartItemController(),
        new WishListItemController(),
        new OrderItemController(),
    ],
    Number(process.env.PORT),
)
app.listen()
