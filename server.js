const express = require("express")
const corsOptions = require("./config/corsOptions");
const cors = require("cors");

const app = express();
const PORT = 3500;

app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get("/*", () => console.log("404"))

app.use('/register', require('./routes/register'));
app.use('/reminders', require('./routes/api/reminders'));
app.use('/auth', require('./routes/auth'));

app.listen(PORT, console.log)