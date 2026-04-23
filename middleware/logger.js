const logger = (req, res, next) => {
    const method = req.method;
    const url = req.url;

    const user = req.session && req.session.user ? req.session.user.email : "guest";

    console.log(`${method} ${url} - user: ${user}`);

    next();
};

module.exports = logger;