import joi from "joi" 

const schemaUrl = joi.object({
    url: joi.string().uri().empty().required()
})

export {schemaUrl}