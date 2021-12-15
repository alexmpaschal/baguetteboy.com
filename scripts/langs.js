export function determineLang(req) {
    if (req.query.lang) {
        return req.query.lang
    } else {
        return "en"
    }
}

export function checkLangSupport(lang) {
    const supportedLangs = [ 'en', 'fr', 'ch' ]

    if (supportedLangs.includes(lang)) {
        return true
    } else {
        return false
    }
}