const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require('../../models/user')

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,

    email: 'mike@example.com',
    password: '56what!',
}

const userTwoId = new mongoose.Types.ObjectId()
const userTwo = {
    _id: userTwoId,

    email: 'neyo@example.com',
    password: 'askldjaskl;djk!',
}


const setupDatabase = async() => {
    await User.deleteMany()
    await new User(userOne).save()
    await new User(userTwo).save()
}

module.exports = {
    userOneId,
    userTwoId,
    userOne,
    userTwo,
    setupDatabase
}
