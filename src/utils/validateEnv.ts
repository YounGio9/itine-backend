import { cleanEnv, port, str } from 'envalid'

function validateEnv() {
    cleanEnv(process.env, {
        NODE_ENV: str({
            choices: ['development', 'production'],
        }),
        PORT: port({ default: 8000 }),
        DATABASE_URL: str(),
    })
}

export default validateEnv
