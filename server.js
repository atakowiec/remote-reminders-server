const express = require("express")
const corsOptions = require("./config/corsOptions");
const cors = require("cors");

const app = express();
const PORT = 3500;

app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/register', require('./routes/register'));

app.use('/reminders', require('./routes/api/reminders'));
app.use('/auth', require('./routes/auth'));

app.get("/*", (req,res) => res.sendStatus(404));

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
