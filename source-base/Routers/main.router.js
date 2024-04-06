const newRouter = require('./news.router')
const sitesRouter = require('./sites.router')
function route(app){
    app.use('/news',newRouter)
    app.use('/searchs',sitesRouter)
    app.use('/',sitesRouter)

}

module.exports = route;