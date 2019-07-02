var Connection = require('../connection');
require('dotenv').config();

//Initialize new API Connection:
var api = new Connection({
    hash: process.env.STORE_HASH,
    token: process.env.STORE_TOKEN,
    cid: process.env.STORE_CID,
    host: 'https://api.bigcommerce.com' //The BigCommerce API Host
});

var appRouter = function (app) {

    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    app.get("/", function (req, res) {
        res.status(200).send({
            message: 'Welcome to the BigCommerce API'
        });
    });

    app.get("/all", function(req, res) {
        // console.log(res)
       api.get("/brands")
       .then((response) => {
           console.log(response);
            let responseData = { response };
            res.status(200).json(responseData);
            // console.log(responseData);
       })
       .catch((err) => {
           console.log(err)
       })
    });

    // app.get("/:id", function(req, res) {
    //     api.get(`/brands/${req.param.id}`)
    //     .then((response) => {
    //         let responseData = { response };
    //         res.status(200).json(responseData);
    //     })
    //     .catch((err) => {
    //         console.log(err)
    //     })
    // });

};

module.exports = appRouter;

