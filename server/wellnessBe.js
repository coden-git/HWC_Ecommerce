const express = require('express');
const router = require('./api/route');
const bodyParser = require('body-parser');
const dotenv = require('dotenv')
const dbCon = require('./db/connection')
const cors = require('cors')
const compression = require('compression')
const helmet = require('helmet');
const { createUploadFolderIfNotExists } = require('./api/utils');
const app = express();
app.use(compression())
app.use(helmet())
dotenv.config({ path: './.env' })
dbCon.connect()
const port = process.env.PORT;
console.log(process.env.ENV)
app.use(cors())
app.use(bodyParser.json({ limit: '15mb' }))
app.use('/api', router)
createUploadFolderIfNotExists();
const server = app.listen(port, async() => {
	console.log(`Server is running on port ${port}`)
})
server.setTimeout(20000*10)

