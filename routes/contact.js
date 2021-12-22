import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
import nodemailer from 'nodemailer'

import { determineLang, renderLangPage } from '../scripts/lang.js'

const router = express.Router()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config()

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_NAME,
        pass: process.env.EMAIL_PASS
    }
})

router.use(express.urlencoded({ extended: true }))
router.use(express.static(__dirname + './../public'));

router.get('/', (req, res, next) => {
    renderLangPage(req, res, '/contact')
})

router.post('/', (req, res) => {
    const lang = determineLang(req)

    transporter.sendMail({
        from: `${req.body.name} ${req.body.email}`,
        to: process.env.EMAIL_NAME,
        subject: req.body.subject,
        text: req.body.message
    })

    res.redirect(`/?lang=${lang}&contact_success=true`)
})

export default router