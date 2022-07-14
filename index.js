const app = require('./resources/main')

const port = process.env.PORT
app.listen(port, function () {
    return console.log(`Server is running on ${port}`);
});
