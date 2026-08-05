const adminAuth = (req, res) => {
    const token = "janu"
    const isAutherrizedUser = token === "janu";
    if (isAutherrizedUser) {
        res.send(" all data send")
    } else {
        res.status(404).send("unauthoeriezed request");
    };
};

module.exports = { adminAuth }
