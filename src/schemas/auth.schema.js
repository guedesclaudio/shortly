import joi from "joi"

const schemaSignup = joi.object({
    name: joi.string().trim().empty().required(),
    email: joi.string().email().trim().empty().required(),
    password: joi.string().alphanum().min(4).empty().required(),
    confirmPassword: joi.ref("password"),
})

const schemaSignin  = joi.object({
    email: joi.string().email().trim().empty().required(),
    password: joi.string().alphanum().min(4).empty().required(),
})

export {schemaSignup, schemaSignin}