const db = require('../../models/index');
class UserController{
     handleLogin = (req,res) => {
        let email = req.body.email;
        let password = req.body.password;
        return res.status(200).json({
            yourEmail : email,
            yourPassword : password
        })
    }
}
module.exports = new UserController();