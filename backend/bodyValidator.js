import zod from 'zod'

const signupValidator = zod.object({
    username: zod.string(),
    email: zod.string().email(),
    password: zod.string(),
})
const signinValidator = zod.object({
    username: zod.string(),
    password: zod.string(),
})

const courseValidator = zod.object({
    title: zod.string(),
    description: zod.string(),
    price: zod.number(),
    imageUrl: zod.string()
})

export {
    signinValidator, signupValidator, courseValidator
}
