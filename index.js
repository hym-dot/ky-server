const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

const boardRouter = require('./routes/board')
app.use('/boards', boardRouter)




app.get("/", (req, res) => {
    res.send("Hello Express!");
});

app.listen(PORT, () => {
    console.log("Server is running");
});
