import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
import contact from './routes/contact.js'
import { determineLang, checkLangSupport } from './scripts/langs.js'

const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const PORT = process.env.PORT || 3000

dotenv.config()

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs')

app.use('/contact', contact)

app.get('/', (req, res, next) => {
    const lang = determineLang(req)
    const langSupported = checkLangSupport(lang)

    if (langSupported) {
        res.render(`./${lang}/`)
    } else {
        res.status(404)
        next()
    }
})

app.use(function(req, res) {
    res.status(404).render(`./404`)
})

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}.`)
})
