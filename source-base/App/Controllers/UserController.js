const bcrypt = require('bcrypt');
const db = require('../../models/index');
class UserController {
    handleLogin = async (req, res) => {
        let email = req.body.email;
        let password = req.body.password;
        const user = await db.User.findOne({ email: email });
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);

        if (passwordCompare) {
            return res.status(200).json({ message: 'ok' });
        } else {
            return res.status(401).json({ message: 'Invalid password' });
        }
    }
}
module.exports = new UserController();