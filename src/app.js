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
// app.get("/user/:userId/:name/:passwrod", (req, res) => {
//     console.log(req.params); //dynamc routinjg 
//     res.send({ first_name: "saikrishna", last_name: "Potharaboina" })
// });


app.use("/user", (req, res, next) => {
    //responds 1 
    console.log("handling the router user");

    console.log(req.query);
    res.send("Responds 1");

    /** */
    //if i want to go 2nd responds i will use next(); for 2nd router exute thats it........haha
    next();




}, (req, res, next) => {
    //responds 2 
    console.log("handling the router user");
    console.log(req.query);
    res.send("Responds 3")
    next();
}, (req, res, next) => {
    //responds 2 
    console.log("handling the router user");
    console.log(req.query);
    res.send("Responds 4 ")
    next();
}, (req, res, next) => {
    //responds 2 
    console.log("handling the router user");
    console.log(req.query);
    res.send("Responds 5")
    next();
}, (req, res, next) => {
    //responds 2 
    console.log("handling the router user");
    console.log(req.query);
    res.send("Responds 6")
    next();
}, (req, res, next) => {
    //responds 2 
    console.log("handling the router user");
    console.log(req.query);
    res.send("Responds 7")
    next();
}, (req, res, next) => {
    //responds 2 
    console.log("handling the router user");
    console.log(req.query);
    res.send("Responds 8")
    next();
}, (req, res) => {
    //responds 2 
    console.log("handling the router user");
    console.log(req.query);
    res.send("Responds 9")
});

app.listen(3000, () => {
    console.log("server is successful listing")
});


