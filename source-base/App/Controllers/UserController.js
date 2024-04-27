const bcrypt = require('bcrypt');
const db = require('../../models/index');
class UserController {
    handleLogin = async (req, res) => {
        let email = req.body.email;
        let password = req.body.password;
        console.log(email, password);
        const user = await db.User.findOne({ email: email });
        let userPassword = '';

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        else{
            userPassword = user.password;
        }
        console.log(userPassword)
        await bcrypt.compare(password, userPassword, function(err, result) {
            if(err) throw err;
            if(result) {
                // req.session.isAuth = true;
                // res.status(200).json({
                //   status: "success",
                //   data: {
                //     user: results.rows,
                //   },
                // });
                res.status(200).json({
                    message : 'ok'
                });
            }
            else{
                res.status(404).json({ message: 'Password not match' });
            }
        });
    }
}
module.exports = new UserController();