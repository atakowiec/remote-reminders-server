const usersDB = require("../model/UsersDB")

const getReminders = (req, res) => {
    const { profiles, active } = req.body;
    if(!profiles)
        return res.status(400).json({"message": "No profiles specified"})
    const username = req.user;

    const everyReminders = usersDB.getUserData(username).reminders;

    const resultReminders = everyReminders.map(
            reminder => (reminder.profiles.some(profile => profiles.indexOf(profile) >= 0) &&
            reminder.active === active)
    );

    return res.json(resultReminders).sendStatus(200);
}

const removeReminder = async (req, res) => {
    const reminderId = req.body.reminderId;
    if(!reminderId)
        return res.sendStatus(204)
    const userData = usersDB.getUserData(req.user)

    userData.reminders = userData?.reminders.map(reminder => {
        reminder.active = false
        return reminder;
    });

    const otherUsers = usersDB.users.map(user => user.username !== req.user)

    await usersDB.setUsers([...otherUsers, userData]).saveFile();

    res.sendStatus(200)
}

const createReminder = (req, res) => {
    res.status(200).json({"user": req.user})
}

module.exports = {getReminders, removeReminder, createReminder}

