const bcrypt = require('bcrypt');
const db = require('../models/index');
const validUserData = require('../services/validateUserData');
const saltRounds = 10;
function createNewUser(data) {
    return new Promise((resolve, reject) => {
        validUserData.validateUserData(data)
            .then(() => hashUserPassword(data.password))
            .then((hashPassword) => {
                return db.User.create({
                    email: data.email,
                    password: hashPassword,
                    phone: data.numberPhone
                });
            })
            .then(() => resolve({ success: true }))
            .catch((error) => {
                let errorMessage;
                if (error instanceof Error) {
                    errorMessage = error.message;
                } else {
                    errorMessage = "Unknown error occurred.";
                }
                reject({ success: false, message: errorMessage });
            });
    });
}
async function hashUserPassword(password) {
    try {
        const hash = await bcrypt.hash(password, saltRounds);
        return hash;
    } catch (error) {
        throw new Error('Failed to hash password.');
    }
}

async function getAllUsers() {
    try {
        const users = await db.User.findAll();
        return users;
    } catch (error) {
        throw new Error('Failed to fetch users.');
    }
}

module.exports = {
    createNewUser,
    getAllUsers
};
