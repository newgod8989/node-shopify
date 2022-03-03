const express = require('express');
const app = express();
const port = 5000;
const axios = require('axios');
const bodyParser = require("body-parser");

app.use(express.static(__dirname + '/'));
app.use(bodyParser.urlencoded({extend:true}));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.set('views', __dirname);

app.get('/', function(req, res){
    res.render("index");
});


app.get('/product', (req, res) => {

    var config = {
        method: 'get',
        url: 'https://fullstack-lab.myshopify.com/admin/api/2021-07/products.json',
        headers: {
            'X-shopify-Access-Token': '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',
            'Content-Type': 'application/json',
        }
    };

    axios(config)
    .then(function (response) {
        res.render("index", { products: response.data.products });

    })
    .catch(function (error) {
        console.log(error);
    });

});

app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
});