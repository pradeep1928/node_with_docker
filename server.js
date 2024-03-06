const express = require("express");
const mongoose = require("mongoose");
const {
    MONGO_USER,
    MONGO_PASSWORD,
    MONGO_IP,
    MONGO_PORT,
} = require("./config/config");
const postRouter = require('./routes/postRoutes')
const port = 3000;

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

let mongoUrl = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

console.log("🚀 ~ mongoUrl:", mongoUrl);

const mongoConnectWithRetry = () => {
    // mongodb of docker container
    mongoose
        .connect(mongoUrl)
        .then(() => {
            console.log("connected to MongoDB server successfully!");
        })
        .catch((err) => {
            console.error(`MongoDB connection error: ${err.message}`);
            setTimeout(() => {
                mongoConnectWithRetry();
            }, 2000);
        });
}

mongoConnectWithRetry()

app.get("/", (req, res) => {
    console.log("Get request");
    res.send(`<h2> Hello world</h2>`);
});

app.use('/posts', postRouter)

app.listen(port, () => {
    console.log(`Server started at port  ${port}`);
});
