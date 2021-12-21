import express from 'express'

import { Article } from '../scripts/db.js'
import { renderLangPageWithParams } from '../scripts/lang.js'

const router = express.Router()

router.get('/', async (req, res) => {
    const articles = await Article.find().sort({ createdAt: 'desc' })
    
    renderLangPageWithParams(req, res, '/blog/', { articles: articles })
})

router.get('/:slug', async (req, res) => {
    const article = await Article.findOne({ slug: req.params.slug })
    if (article === null) res.redirect('blog/')

    renderLangPageWithParams(req, res, '/blog/show', { article: article })
})

export default router