import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
import contact from './routes/contact.js'

const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config()

const PORT = process.env.PORT || 3000

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs')

app.use('/contact', contact)

app.get('/', (req, res) => {
    res.render('./en/')
})

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}.`)
})