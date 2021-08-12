const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.createUser = (req, res) => {

    setTimeout(function() {
        bcrypt.hash(req.body.password, 10)
            .then(hash => {
                const user = new User({
                        email: req.body.email,
                        role: req.body.role,
                        password: hash
                    })
                    //   console.log(user)
                user.save()
                    .then(result => {
                        // console.log(user)
                        return res.status(200).json({
                            message: "User created",
                            result: result
                        })
                    })
                    .catch(err => {
                        // console.log(err);
                        return res.status(400).json({
                            message: "Invalid Authentication cridentials  "

                        })

                    })
            })
    }, 30000)

}

exports.userLogin = (req, res, next) => {
    // setTimeout(function() {
    let fetchedUser;
    User.findOne({ email: req.body.email })
        .then(user => {
            // console.log(user);
            if (!user) {

                return res.status(401).json({
                    message: "Auth failed"
                })
            }
            fetchedUser = user;
            return bcrypt.compare(req.body.password, user.password)
        })
        .then(result => {
            if (!result) {
                return res.status(401).json({
                    message: "Auth failed"
                })
            }
            const token = jwt.sign({ email: fetchedUser.email, userId: fetchedUser._id, role: fetchedUser.role },
                'secret_this_should_be_longer', { expiresIn: "1h" })
            return res.status(200).json({
                token: token,
                expiresIn: 500,
                userId: fetchedUser._id
            })

        })
        .catch(err => {
            // console.log(err);
            return res.status(401).json({
                message: "Invalid password or email"
            })
        })
        // }, 30000)

}
