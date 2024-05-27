const express = require('express');
const db = require('mysql-promise')();
const routes = require('./routes/routes');
const router = express.Router()

module.exports = router;


db.configure({
	"host": "localhost",
	"user": "root",
	"password": "Password01",
	"database": "bankNeoCommerce"
});

const app = express();

app.use(express.json());

app.listen(3001, () => {
    console.log(`Server Started at ${3001}`)
})

app.use('/api', routes)

