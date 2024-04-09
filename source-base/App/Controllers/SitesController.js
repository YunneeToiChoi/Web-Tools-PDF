class SitesController {
    home(req, res) {
        res.render('news');
    }
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SitesController();
