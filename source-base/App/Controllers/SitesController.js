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
        try {
            await CRUDService.createNewUser(req.body);
            res.status(200).json({
                error: 0,
                message: 'Sign Up Successfully',
            });
        } catch (error) {
            console.error('Error occurred during user creation:', error);
            res.status(400).json({
                error: 1,
                message: error.message || 'An error occurred during sign up.',
            });
        }
    };
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
