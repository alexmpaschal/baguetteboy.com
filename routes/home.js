import express from 'express'

import contactSuccessMessages from '../scripts/contact-success-messages.js'
import { determineLang, renderLangPage, renderLangPageWithParams } from '../scripts/lang.js'

const router = express.Router()

router.get('/', (req, res) => {
    if (req.query.cs == 'true') {
        const lang = determineLang(req)
        const contactSuccessMessage = contactSuccessMessages[lang]
        renderLangPageWithParams(req, res, '', { contactSuccessMessage: contactSuccessMessage })
    } else {
        renderLangPage(req, res, '')
    }
})

export default router