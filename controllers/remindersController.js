const usersDB = require("../model/UsersDB")

const getReminders = (req, res) => {
    let { profiles, active } = req.body;
    if(!profiles)
        return res.status(400).json({"message": "No profiles specified"})
    if(active === undefined || active === null)
        active = true;

    const username = req.user;

    const everyReminders = usersDB.getUserData(username).reminders;

    const resultReminders = everyReminders.filter(
            reminder => (reminder.profiles.some(profile => profiles.indexOf(profile) >= 0) &&
            reminder.active === active)
    );

    return res.status(200).json(resultReminders);
}

const removeReminder = async (req, res) => {
    const reminderId = req.body.reminderId;
    if(!reminderId)
        return res.sendStatus(204)
    const userData = usersDB.getUserData(req.user)

    userData.reminders = userData?.reminders.map(reminder => {
        if(reminder.id === reminderId)
            reminder.active = false
        return reminder;
    });

    const otherUsers = usersDB.users.filter(user => user.username !== req.user)

    await usersDB.setUsers([...otherUsers, userData]).saveFile();

    res.sendStatus(200)
}

const createReminder = async (req, res) => {
    const {title, description, profiles} = req.body;
    const userData = usersDB.getUserData(req.user);

    if(!title || !description || !profiles)
        return res.sendStatus(400);

    let id = 1;
    userData.reminders.forEach(reminder => reminder.id >= id ? id = reminder.id : "");
    id++;

    const newReminder = {
        id,
        title,
        description,
        profiles,
        date: new Date().getTime(),
        active: true
    }

    userData.reminders = [...userData.reminders, newReminder];
    const otherUsers = usersDB.users.filter(user => user.username !== req.user)

    await usersDB.setUsers([...otherUsers, userData]).saveFile();

    res.sendStatus(201);
}

module.exports = {getReminders, removeReminder, createReminder}

