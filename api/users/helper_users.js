const db = require('../../data/dbConfig')

module.exports = {
    get,
    create,
    getById,
    editById,
    deleteById,
    getByOTP,
    getByPhone,
    getByEmail
}

function get(){
    return db('users');
}

function create(user){
    return db('users').insert(user);
}

function getById(id){
    return db('users').where({id}).first();
}

function getByPhone(phone){
    return db('users').where({phone, phone}).first();
}

function getByEmail(email){
    return db('users').where({email, email}).first();
}

function getByOTP(phone, otp){
    return db('users').where({phone, otp}).first();
}


function editById(id, data){
    return db('users').where({id}).update(data)
}

function deleteById(id){
    return db('users').where({id}).first().del();
}