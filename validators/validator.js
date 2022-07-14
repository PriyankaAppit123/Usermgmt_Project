const statusCodes = require('http-status-codes').StatusCodes

const validator = (schema, paramType) => {
    return (req, res, next) => {
        const { error } = schema.validate(req[paramType]);
        const valid = error == null
        if (valid) {
            next();
        }
        else 
        {
            const { details } = error;
           // console.log(details)
            const message = details.map(i => i.path).join(',');
           // console.log(message)
            console.log({"Validator Error -- ": message})
            console.log(message. replace("/message/g","message"));
            res.status(statusCodes.UNPROCESSABLE_ENTITY).send({error : [message +" is required"]})
        }
    }
};

module.exports = validator