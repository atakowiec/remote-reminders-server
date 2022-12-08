const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
require("dotenv").config()

const usersDB = require("../model/UsersDB")

const handleAuth = async (req, res) => {
    console.log("req.body: "+req.body)
    const { username, password } = req.body;

    if(!username || !password)
        return res.status(400).json({"message": "Username and password are required"})

    try {
        const user = usersDB.users.find(e => e.username === username)
        const match = await bcrypt.compare(password, user.password)
        if(!user || !match) {
            return res.status(401).json({"message": "Username and password don't match"})
        } else {
            const accessToken = jwt.sign(
                { "username": user.username },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "1d" }
            )
            const refreshToken = jwt.sign(
                { "username": user.username },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: "1d" }
            )
            const otherUsers = usersDB.users.filter(e => e.username !== user.username);

            usersDB.setUsers([...otherUsers, {...user, refreshToken}])

            return res.status(200)
                .cookie('jwt', accessToken, {httpOnly: true, maxAge: 24 * 3600 * 1000})
                .send(accessToken)
        }
    } catch (err) {
        return res.status(500).json({"message": err.message})
    }
}

module.exports = {handleAuth};