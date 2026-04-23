const express = require("express");
const router = express.Router();
const requireLogin = require("../middleware/requireLogin");
const moviesDB = require("../db/movies");

// dashboard
router.get("/", requireLogin, (req, res) => {
    req.session.views = (req.session.views || 0) + 1;

    // punem "General" daca nu exista
    const moviePref = req.cookies.moviePref || "General";
    const lastMovieSeen = req.cookies.lastMovie || null;

    res.render("movies/index", {
        user: req.session.user,
        movies: moviesDB.getAll(),
        views: req.session.views,
        moviePref: moviePref,
        lastMovieCookie: lastMovieSeen
    });
});

// setare preferinta 
router.post("/set-preference", requireLogin, (req, res) => {
    const chosenGenre = req.body.genre;
    
    res.cookie("moviePref", chosenGenre, { maxAge: 30 * 24 * 60 * 60 * 1000 });
    
    res.redirect("/movies");
});

// detalii film
router.get("/:id", requireLogin, (req, res) => {
    const movie = moviesDB.getById(req.params.id);
    if (!movie) return res.status(404).send("Filmul nu a fost găsit");

    res.cookie("lastMovie", movie.titlu, { maxAge: 900000, httpOnly: true });
    res.render("movies/detail", { movie, user: req.session.user });
});

// adaugare film
router.post("/add", requireLogin, (req, res) => {
    if (req.body.titlu) {
        moviesDB.add(req.body);
    }
    res.redirect("/movies");
});

module.exports = router;