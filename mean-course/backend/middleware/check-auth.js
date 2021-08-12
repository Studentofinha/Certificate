const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        console.log(req.headers)
        const token = req.headers.authorization.split(" ")[1]
        console.log(token)
        jwt.verify(token, "secret_this_should_be_longer")
        console.log('Decoded', jwt.decode('Decoded', token));

        req.user = jwt.decode(token)
        next();
    } catch (error) {
        res.status(401).json({ message: "You are not authenticated" })
    }

}
