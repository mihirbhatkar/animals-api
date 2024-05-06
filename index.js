const express = require("express");
const dotenv = require("dotenv");

const connectDB = require("./config/db.js");
const routes = require("./routes/allRoutes.js");
const { notFound, errorHandler } = require("./middleware/errorMiddleware.js");

dotenv.config();
connectDB();
const port = process.env.PORT_NO || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", routes);

app.get("/", (req, res) => res.send("server is running!"));

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
