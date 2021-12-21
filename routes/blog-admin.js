import express from 'express'

import { checkAuthenticated, checkNotAuthenticated, passportAuthenticate } from '../scripts/auth.js'
import { Article } from '../scripts/db.js'
import { determineLang, renderLangPage, renderLangPageWithParams } from '../scripts/lang.js'

const router = express.Router()

router.get('/', checkAuthenticated, async (req, res) => {
    const articles = await Article.find().sort({ createdAt: 'desc' })
    renderLangPageWithParams(req, res, 'blog/admin', { articles: articles })
})

router.get('/login', checkNotAuthenticated, (req, res) => {
    renderLangPage(req, res, 'blog/admin/login')
})

router.post('/login', checkNotAuthenticated, (req, res, next) => {
    const lang = determineLang(req)
    passportAuthenticate(lang)(req, res, next)
})

router.delete('/logout', (req, res) => {
    req.logOut()

    const lang = determineLang(req)
    res.redirect(`/blog/admin/login/?lang=${lang}`)
})

router.get('/new', checkAuthenticated, (req, res) => {
    renderLangPageWithParams(req, res, 'blog/admin/new', { article: new Article() })
})

router.get('/edit/:id', checkAuthenticated, async (req, res) => {
    const article = await Article.findById(req.params.id)
    renderLangPageWithParams(req, res, 'blog/admin/edit', { article: article })
})

router.get('/:slug', checkAuthenticated, async (req, res) => {
    const article = await Article.findOne({ slug: req.params.slug })
    if (article === null) res.redirect('blog/admin/')
    renderLangPageWithParams(req, res, 'blog/admin/show', { article: article })
})

router.post('/', async (req, res, next) => {
    req.article = new Article()
    next()
}, saveArticleAndRedirect('blog/admin/new'))

router.put('/:id', async (req, res, next) => {
    req.article = await Article.findById(req.params.id)
    next()
}, saveArticleAndRedirect('blog/admin/edit'))

router.delete('/:id', async (req, res) => {
    await Article.findByIdAndDelete(req.params.id)

    const lang = determineLang(req)
    res.redirect(`/blog/admin/?lang=${lang}`)
})

function saveArticleAndRedirect(path) {
    return async (req, res) => {
        let article = req.article
        article.title = req.body.title
        article.description = req.body.description
        article.markdown = req.body.markdown

        const lang = determineLang(req)
        try {
            article = await article.save()
            res.redirect(`/blog/admin/${article.slug}/?lang=${lang}`)
        } catch (e) {
            res.render(`/blog/admin/${path}/?lang=${lang}`, { article: article })
        }
    }
}

export default router