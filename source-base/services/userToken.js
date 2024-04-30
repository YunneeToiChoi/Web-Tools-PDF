const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

function generateJWTToken(user) {
    if (!secretKey) {
        throw new Error('SECRET_KEY is not set');
    }
    const payload = {
        userId: user.id,
        email: user.email,
        phone : user.phone,
        role : user.role,
    };
    try {
        // Sign JWT token with secret key and set expiration time 
        const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
        return token;
    } catch (error) {
        throw new Error('Failed to generate JWT token');
    }
}

module.exports = generateJWTToken;
