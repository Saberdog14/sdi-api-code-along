const db = require('../db/db')
const bcrypt = require('bcrypt')

const SALT_ROUNDS = 10

const createUser = async(user) =>{
    return db('users').insert(user).returning(['id','username','role'])
}

