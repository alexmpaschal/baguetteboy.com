import express from 'express'

import { renderLangPage } from '../scripts/lang.js'

const router = express.Router()

router.get('/', (req, res) => {
    renderLangPage(req, res, '')
})

export default router