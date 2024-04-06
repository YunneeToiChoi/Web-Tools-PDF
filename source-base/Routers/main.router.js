const newRouter = require('./news.router')
const sitesRouter = require('./sites.router')
const uploadRouter = require('./upload.router')
function route(app){
    app.use('/news',newRouter)
    app.use('/searchs',sitesRouter)
    app.use('/upload',uploadRouter)
    app.use('/',sitesRouter)
}

module.exports = route;