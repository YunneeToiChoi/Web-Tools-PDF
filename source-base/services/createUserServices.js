const bcrypt = require('bcrypt');
const db = require('../models/index');
const salt = bcrypt.genSaltSync(10);
let createNewUser = async(data) => {
    return new Promise(async(resolve, reject) => {
        try{
            let hashPassword = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashPassword,
                phone: data.numberPhone
            })
            resolve('ok');
        }catch(err){
            reject(err);
        }
    });

}
let hashUserPassword = (password) => {
    return new Promise(async(resolve, reject) => {
        try{
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword)
        }catch (err){
            reject(err);
        }
    });
}  
module.exports = createNewUser;