const validator = require("validator")
const validateSignUpData = (req) => {

    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName) {
        throw new Error("Name is not valid");

    } else if (firstName.length < 4 || firstName > 80) {
        throw new Error("Name is 4-80 Charaters");
    } else if (!validator.isEmail(email)) {
        throw new Error("Emails is not valid");
    } else if (!validator.isStrongPassword(password)) {
        throw new Error("Password is not Strong")
    }

};

module.exports = validateSignUpData;
