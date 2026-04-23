require('dotenv').config();
const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(session({
    secret: process.env.SESSION_SECRET || "default-fallback-secret", 
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
}));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

// rute
const authRoutes = require("./routes/auth");
const movieRoutes = require("./routes/movies");

// middleware
const logger = require("./middleware/logger");
app.use(logger);

// mapare rute
app.use("/", authRoutes);
app.use("/movies", movieRoutes);

// home
app.get("/", (req, res) => {
    if (req.session.user) {
        return res.redirect("/movies");
    }
    res.render("home");
});

// server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server de filme pornit pe http://localhost:${PORT}`);
});