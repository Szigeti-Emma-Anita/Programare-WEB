const express = require("express");
const router = express.Router();
const usersDB = require("../db/users");

router.get("/register", (req, res) => {
    res.render("register");
});

router.post("/register", async (req, res) => {
    const { email, password } = req.body;

    if (usersDB.findByEmail(email)) {
        return res.send("Utilizatorul există deja!");
    }

    const newUser = await usersDB.create(email, password);
    
    req.session.user = { email: newUser.email };
    res.redirect("/movies");
});

router.get("/login", (req, res) => {
    res.render("login");
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = usersDB.findByEmail(email);

    if (user && await usersDB.comparePassword(password, user.password)) {
        req.session.user = { email: user.email };
        return res.redirect("/movies");
    }

    res.send("Email sau parolă incorectă!");
});

router.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.clearCookie("connect.sid");
        res.redirect("/");
    });
});

module.exports = router;