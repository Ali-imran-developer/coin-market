require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dbConnect = require("./dbConnect");
const serverless = require("serverless-http");
const authRouter = require("./routes/auth-routes");
const blogsRouter = require("./routes/blogs-routes");
const bannersRouter = require("./routes/banners-routes");
const gamesRouter = require("./routes/games-routes");
const welcomeRouter = require("./routes/welcome-routes");
const sportsRouter = require("./routes/sports-routes");
const tournamentsRouter = require("./routes/tournaments-routes");

const app = express();
dbConnect();
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use("/api", authRouter);
app.use("/api/blogs", blogsRouter);
app.use("/api/banners", bannersRouter);
app.use("/api/games", gamesRouter);
app.use("/api/welcome", welcomeRouter);
app.use("/api/sports", sportsRouter);
app.use("/api/tournaments", tournamentsRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

module.exports = app;
module.exports.handler = serverless(app);