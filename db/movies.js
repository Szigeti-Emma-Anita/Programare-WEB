let movies = [
    { id: 1, titlu: "Inception", regizor: "Christopher Nolan", an: 2010, rating: 9, gen: "SF", vizionat: true },
    { id: 2, titlu: "Interstellar", regizor: "Christopher Nolan", an: 2014, rating: 9, gen: "SF", vizionat: false },
    { id: 3, titlu: "Joker", regizor: "Todd Phillips", an: 2019, rating: 8, gen: "Dramă", vizionat: true },
    { id: 4, titlu: "Titanic", regizor: "James Cameron", an: 1997, rating: 9, gen: "Dramă", vizionat: false },
    { id: 5, titlu: "Avengers: Endgame", regizor: "Anthony Russo", an: 2019, rating: 8.5, gen: "Acțiune", vizionat: true },
    { id: 6, titlu: "Parasite", regizor: "Bong Joon-ho", an: 2019, rating: 8.6, gen: "Dramă", vizionat: false }
];

module.exports = {
    getAll: () => movies,
    getById: (id) => movies.find(m => m.id == id),
    add: (movieData) => {
        const newFile = {
            id: movies.length + 1,
            titlu: movieData.titlu,
            regizor: movieData.regizor || "Necunoscut",
            an: movieData.an,
            gen: movieData.gen,
            rating: "-",
            vizionat: false
        };
        movies.push(newFile);
        return newFile;
    }
};