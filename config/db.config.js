// Update with your config settings.
require('dotenv').config()

module.exports = {

    client: 'mysql',
    connection: {
        host: process.env.DB_HOSTNAME,
        database: process.env.DB_NAME,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
        
    },
    pool: {
        min: process.env.DB_POOL_MIN,
        max: process.env.DB_POOL_MAX,
    }
};



