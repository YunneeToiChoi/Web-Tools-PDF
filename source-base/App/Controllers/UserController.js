// UserController.js
const bcrypt = require('bcrypt');
const db = require('../../models/index');
const generateJWTToken = require('../../services/userToken.js');

class UserController {
    handleLogin = async (req, res) => {
        let email = req.body.email;
        let password = req.body.password;
        console.log(email)
        try {
            const user = await db.User.findOne({ where: { email: email } });

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const isPasswordMatch = await bcrypt.compare(password, user.password);

            if (!isPasswordMatch) {
                return res.status(404).json({ message: 'Password not match' });
            }

            const token = generateJWTToken(user);
            res.cookie('token', token, { httpOnly: true, maxAge: 86400000 }); // 24h
            res.status(200).json({ message: 'Login successful', token: token });
        } catch (error) {
            console.error('Login error:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    };
    checkLoginStatus = (req, res) => {
        const token = req.cookies.token;
    
        if (token) {
            try {
                // Giải mã token để lấy thông tin người dùng từ payload
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
                // Kiểm tra xem token có hợp lệ không
                if (decoded) {
                    // Token hợp lệ, trả về thông tin người dùng
                    res.status(200).json({ success: true, user: decoded.user });
                } else {
                    // Token không hợp lệ, yêu cầu đăng nhập lại
                    res.status(401).json({ success: false, message: 'Unauthorized' });
                }
            } catch (error) {
                // Xử lý lỗi khi giải mã token
                console.error('Token verification error:', error);
                res.status(401).json({ success: false, message: 'Unauthorized' });
            }
        } else {
            // Không có token, yêu cầu đăng nhập lại
            res.status(401).json({ success: false, message: 'Unauthorized' });
        }
    };
    
}

module.exports = new UserController();
