import passport from 'passport'

import { determineLang } from './lang.js'

export function checkAuthenticated(req, res, next) {
    const lang = determineLang(req)

    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect(`/blog/admin/login/?lang=${lang}`)
}

export function checkNotAuthenticated(req, res, next) {
    const lang = determineLang(req)

    if (req.isAuthenticated()) {
        res.redirect(`/blog/admin/?lang=${lang}`)
    }
    next()
}

export function passportAuthenticate(lang) {
    return passport.authenticate('local', {
        successRedirect: `/blog/admin/?lang=${lang}`,
        failureRedirect: `/blog/admin/login/?lang=${lang}`,
        failureFlash: true
    })
}