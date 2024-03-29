const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require('./routes/UserRoutes');

const app = express();

app.use(cors());
app.use(express.json());

mongoose
    .connect("mongodb+srv://alemdinarevic:Paranoja123.@moviehub.nfwn1iz.mongodb.net/", {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
    })
    .then(() => {
        console.log("DB Connetion Successfull");
    })
    .catch((err) => {
        console.log("Error: ", err.message);
    });

app.use("/api/user", userRoutes);


app.listen(8000, () => console.log("server started on port 8000"));

