const bcrypt = require("bcrypt");

const usersDB = {
    users: require("../model/usersDB.json")
};

const handleAuth = async (req, res) => {
    console.log(req.body)
    const { username, password } = req.body;

    if(!username || !password)
        return res.status(400).json({"message": "Username and password are required"})

    try {
        const user = usersDB.users.find(e => e.username === username)
        const match = await bcrypt.compare(password, user.password)
        if(!user || !match) {
            return res.status(401).json({"message": "Username and password don't match"})
        } else {
            return res.status(200).json({"username": user.username})
        }
    } catch (err) {
        return res.status(500).json({"message": err.message})
    }
}

module.exports = {handleAuth};