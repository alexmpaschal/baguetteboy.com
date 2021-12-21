import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import passport from 'passport'
import methodOverride from 'method-override'
import flash from 'express-flash'
import session from 'express-session'

import initializePassport from './scripts/passport-config.js'
import { User } from './scripts/db.js'
import homeRouter from './routes/home.js'
import contactRouter from './routes/contact.js'
import blogRouter from './routes/blog.js'
import blogAdminRouter from './routes/blog-admin.js'

const app = express()

if (process.env.NODE_ENV !== 'production') {
    dotenv.config()
}

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
app.use(express.static(__dirname + '/public'));

const PORT = process.env.PORT || 3000

initializePassport(
    passport,
    email => User.find(user => user.email === email),
    id => User.find(user => user.id === id)
)

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() =>
    console.log('Connected to MongoDB database')
).catch((err) =>
    console.log(err)
)

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

app.use('/blog/admin', blogAdminRouter)

app.use('/blog', blogRouter)

app.use('/contact', contactRouter)

app.use('/', homeRouter)

app.use(function(req, res) {
    res.status(404).render('404')
})

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}.`)
})