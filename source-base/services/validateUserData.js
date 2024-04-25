// In validateUserData.js

const db = require('../models/index');

async function validateUserData(data) {
    try {
        if (!data.email) {
            throw new Error('Email is required.');
        }
        if(!data.password) {
            throw new Error('Password is required.');
        }
        const exists = await isExists(data);
        if (exists) {
            throw new Error('Email already exists in the database.');
        }

        if (!isEmailValid(data.email)) {
            throw new Error('Invalid email format.');
        }

        const passwordValidation = isPasswordValid(data.password);
        if (!passwordValidation.valid) {
            throw new Error(passwordValidation.message);
        }

        // Resolve if validation passes
        return;
    } catch (error) {
        // Reject with error if validation fails
        throw error;
    }
}

async function isExists(data) {
    const email = data.email;
    const existingUser = await db.User.findOne({
        where: { email: email }
    });
    return !!existingUser; // Convert existingUser to a boolean value
}

function isEmailValid(email) {
    const emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return emailFormat.test(email);
}

function isPasswordValid(password) {
    const digitRegex = /\d/;
    const specialCharRegex = /[!@#$%^&*]/;
    const lowercaseRegex = /[a-z]/;
    const uppercaseRegex = /[A-Z]/;
    const isLengthValid = password.length >= 8;

    if (!digitRegex.test(password)) {
        return { valid: false, message: "Password must contain at least one digit (0-9)." };
    } else if (!specialCharRegex.test(password)) {
        return { valid: false, message: "Password must contain at least one special character (!@#$%^&*)." };
    } else if (!lowercaseRegex.test(password)) {
        return { valid: false, message: "Password must contain at least one lowercase letter (a-z)." };
    } else if (!uppercaseRegex.test(password)) {
        return { valid: false, message: "Password must contain at least one uppercase letter (A-Z)." };
    } else if (!isLengthValid) {
        return { valid: false, message: "Password must be at least 8 characters long." };
    }

    return { valid: true };
}

module.exports = {
    validateUserData: validateUserData,
};
