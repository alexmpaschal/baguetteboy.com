export function determineLang(req) {
    if (req.query.lang) {
        return req.query.lang
    } else {
        return "en"
    }
}

function checkLangSupport(lang) {
    const supportedLangs = [ 'en', 'fr', 'ch' ]

    if (supportedLangs.includes(lang)) {
        return true
    } else {
        return false
    }
}

export function renderLangPage(req, res, path) {
    const lang = determineLang(req)
    const langSupported = checkLangSupport(lang)

    if (langSupported) {
        res.render(`${lang}/${path}`)
    } else {
        res.status(404).render('404')
    }
}

export function renderLangPageWithParams(req, res, path, params) {
    const lang = determineLang(req)
    const langSupported = checkLangSupport(lang)

    if (langSupported) {
        res.render(`${lang}/${path}`, params)
    } else {
        res.status(404).render('404')
    }
}