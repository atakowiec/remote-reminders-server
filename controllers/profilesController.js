const usersDB = require("../model/UsersDB")

const getProfiles = (req, res) => {
    return res.status(200).json(usersDB.getUserData(req.user).profiles ?? []);
}

const removeProfile = async (req, res) => {
    const profileName = req.body.profileName;
    if(!profileName)
        return res.sendStatus(204)
    const userData = usersDB.getUserData(req.user)

    userData.profiles = userData.profiles.filter(profile => profile !== profileName)
    const otherUsers = usersDB.users.filter(user => user.username !== req.user)
    await usersDB.setUsers([...otherUsers, userData]).saveFile();

    res.sendStatus(200)
}

const createProfile = async (req, res) => {
    const { profileName } = req.body;

    if (!profileName)
        return res.sendStatus(400);

    const userData = usersDB.getUserData(req.user);

    if(userData.profiles.includes(profileName))
        return res.sendStatus(409);

    userData.profiles = [...userData.profiles, profileName]

    const otherUsers = usersDB.users.filter(user => user.username !== req.user)
    await usersDB.setUsers([...otherUsers, userData]).saveFile();

    res.sendStatus(201);
}

module.exports = {getProfiles, removeProfile, createProfile}

