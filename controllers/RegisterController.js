const bcrypt = require("bcrypt");
const usersDB = require("../model/UsersDB")

const handleNewUser = async (req, res) => {
    console.log("connected")
    const {username, password} = req.body;
    if(!username || !password)
        return res.status(400).json({"message": "Username and password are required"});

    if(usersDB.users.find(e => e.username === username))
        return res.status(409).json({"message": "Username taken"})

    try {
        const encryptedPassword = await bcrypt.hash(password, 10)
        await usersDB.setUsers([...usersDB.users, {"username": username, "password": encryptedPassword}]).saveFile()
        console.log(usersDB.users);
        return res.status(200).json({"message": "Account created"})
    } catch (err) {
        return res.status(500).json({ "message": err.message });
    }
}

module.exports = {handleNewUser}