const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const RedisStore = require("connect-redis").default;
const redis = require("redis");

const {
    MONGO_USER,
    MONGO_PASSWORD,
    MONGO_IP,
    MONGO_PORT,
    MONGO_DB_NAME,
    REDIS_URL,
    REDIS_PORT,
    SESSION_SECRET,
} = require("./config/config");
const postRouter = require("./routes/postRoutes");
const userRouter = require("./routes/userRoutes");
const port = 3000;

let RedisClient = redis.createClient({
    socket: {
        host: REDIS_URL,
        port: REDIS_PORT,
    },
});

(async function () {
    await RedisClient.connect().catch(console.error);
})();

const app = express();

app.enable("trust proxy");

app.use(
    session({
        store: new RedisStore({
            client: RedisClient,
        }),
        secret: SESSION_SECRET,
        cookie: {
            secure: false,
            resave: false,
            saveUninitialized: false,
            httpOnly: true,
            maxAge: 1000 * 60 * 60,
        },
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mongoUrl = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/${MONGO_DB_NAME}?authSource=admin`;

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
};

mongoConnectWithRetry();

app.get("/", (req, res) => {
    console.log("Get request");
    res.send(`<h2> Hello world</h2>`);
});

app.use("/user", userRouter);
app.use("/posts", postRouter);

app.listen(port, () => {
    console.log(`Server started at port  ${port}`);
});
