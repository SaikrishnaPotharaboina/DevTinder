const express = require("express");

const app = express();

// app.use("/test", (req, res) => {
//     res.send("server we using /test/j ")
// });


// app.get("/user", (req, res) => {
//     res.send({ first_name: "saikrishna", last_name: "Potharaboina" })
// });

// app.post("/user", (req, res) => {
//     res.send("save the data successful")
// });

// app.delete("/user", (req, res) => {
//     res.send("delete the data successful")
// })




//its work for /abc ,/ab?c
// app.get("/user", (req, res) => {
//     console.log(req.query);
//     res.send({ first_name: "saikrishna", last_name: "Potharaboina" })
// });


//eaxple's of routing how to handle with some other riuting methos 
app.get("/user/:userId/:name/:passwrod", (req, res) => {
    console.log(req.params); //dynamc routinjg 
    res.send({ first_name: "saikrishna", last_name: "Potharaboina" })
});


app.listen(3000, () => {
    console.log("server is successful listing")
});


