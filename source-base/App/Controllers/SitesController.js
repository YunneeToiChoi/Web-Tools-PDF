const db = require('../../models/index');
class SitesController {
    home = async (req,res) =>  {
        try{
            let data =  await db.User.findAll(); 
            return res.render('home',{
                data: JSON.stringify(data)
            });
    
        }
        catch(err){
           console.log(err);
        }
       
    }
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SitesController();
