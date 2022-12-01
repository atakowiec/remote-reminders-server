const {promises: fsPromises} = require("fs");
const path = require("path");

const usersDB = {
    users: require("../model/usersDB.json"),
    setUsers: data => {
        usersDB.users = data
        return usersDB;
    },
    saveFile: async () => {
        await fsPromises.writeFile(
            path.join(__dirname, "..", "model", "usersDB.json"),
            JSON.stringify(usersDB.users))
        return usersDB;
    },
    getUserData: username => usersDB.users.find(e => e.username === username)
};

module.exports = usersDB;