const newRouter = require('./news.router')
const sitesRouter = require('./sites.router')
const pdfToolsRouter = require('./pdf-tool.router')
const userRouter = require('./user.router')
function route(app){
    app.use('/news',newRouter)
    app.use('/searchs',sitesRouter)
    app.use('/api-login',userRouter) 
    app.use('/pdf-tools',pdfToolsRouter)
    app.use('/',sitesRouter)    
}

module.exports = route;