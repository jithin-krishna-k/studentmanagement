const express = require("express")
const cors = require("cors")
const connectDB = require("./config/db")
const dotenv = require("dotenv")

dotenv.config()
connectDB()

const app = express();

app.use(cors())
app.use(express.json())

//test route
app.get("/", (req, res) => {
    res.send("Hello World!");
    console.log("Response sent");
});

app.use('/api/auth', require('./routes/auth'));
app.use('/api/students', require('./routes/students'));
app.use('/api/staff', require('./routes/staff'));

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});