const usersDB = require("../model/UsersDB")

const getReminders = (req, res) => {
    const { profiles, deleted } = req.body;
    if(!profiles)
        return res.status(400).json({"message": "No profiles specified"})
    const username = req.user;

    const remindersList = usersDB.getUserData(username).reminders

}

const removeReminder = (req, res) => {
    res.status(200).json({"user": req.user})
}

const createReminder = (req, res) => {
    res.status(200).json({"user": req.user})
}

module.exports = {getReminders, removeReminder, createReminder}

