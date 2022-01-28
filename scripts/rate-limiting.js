export function limitRequests(perSecond, maxBurst) {
    const buckets = new Map()

    return function limitRequestsMiddleware(req, res, next) {
        if (!buckets.has(req.ip)) {
            buckets.set(req.ip, new TokenBucket(maxBurst, perSecond))
        }

        const bucketForIP = buckets.get(req.ip)
        if (bucketForIP.take()) {
            next()
        } else {
            res.status(429).render('429')
        }
    }
}