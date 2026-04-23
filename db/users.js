const bcrypt = require('bcrypt');

let users = [];

module.exports = {
    findByEmail: (email) => users.find(u => u.email === email),

    create: async (email, password) => {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = { email, password: hashedPassword };
        users.push(newUser);
        return newUser;
    },

    comparePassword: async (inputPassword, hashedPassword) => {
        return await bcrypt.compare(inputPassword, hashedPassword);
    }
};