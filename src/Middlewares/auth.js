const adminAuth = (req, res) => {
    const token = "sai"
    const isAutherrizedUser = token === "sai";
    if (isAutherrizedUser) {
        res.send(" all data send")
    } else {
        res.status(404).send("unauthoeriezed request");
    };
};

module.exports = { adminAuth }
