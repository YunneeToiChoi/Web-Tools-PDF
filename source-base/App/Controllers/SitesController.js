const db = require('../../models/index');
const CRUDService = require('../../services/user_crud');

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
        await CRUDService.createNewUser(req.body);
        res.send('ok')
    }
    displayGetCRUD = async (req, res) => {
        try{
            let data = await CRUDService.getAllUser();
            return res.render('displayCRUD',{
                dataTable : data,
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
