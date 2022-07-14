
const cors = require('cors')


const corsOptions ={
    origin :'https://localhost:8080',
    optionsSuccessStatus : 200,

}

module.exports = cors(corsOptions);