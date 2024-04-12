const db = require('../../models/index');
const createNewUserServices = require('../../services/createUserServices');

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
    postCRUD = async (req, res) => {
        await createNewUserServices(req.body);
        res.send('ok')
    } 
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SitesController();
