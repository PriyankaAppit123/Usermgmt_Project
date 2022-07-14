const joi = require('@hapi/joi');
const schema = {
    update : joi.object().keys({
        firstname   :   joi.string()
                            .min(3)
                            .max(40)
                            .optional(),
        lastname    :   joi.string()
                            .min(3)
                            .max(40)
                            .optional(),
        dob         :   joi.date()
                           .optional(),
        Username    :   joi.string()
                           .trim()
                           .optional(),
        password    :   joi.string()
                            .optional(),
        email       :   joi.string()
                            .email()
                            .optional(),
        Gender      :   joi.string()   
                            .optional(),
        phoneNo     :   joi.number()
                            .min(10)
                            .optional()
    }),

    insert:joi.object().keys({
        id:joi.number().optional(),
        firstname   :   joi.string()
                            .min(3)
                            .max(40)
                            .required(),
        lastname    :   joi.string()
                            .min(3)
                            .max(40)
                            .required(),
        dob         :   joi.date()
                           .required(),
        Username    :   joi.string()
                           .trim()
                           .required(),
        password    :   joi.string()
                            .required(),
        email       :   joi.string()
                            .email()
                            .required(),
        Gender      :   joi.string()   
                            .required(),
        phoneNo     :   joi.number()
                            .min(10)
                            .required()
    
    }),

    login:joi.object().keys({
        Username :  joi.string()
                        .trim()
                        .required(),
        Password :  joi.string()
                        .required()
    }),

    query:joi.object().keys({
        page    :   joi.number()
                        .optional(),
        limit   :   joi.number()                
                        .optional(),

    })


    }
  

module.exports = schema;