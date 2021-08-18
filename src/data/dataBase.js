const fs = require('fs');
const path = require('path');

module.exports = {
    products: JSON.parse(fs.readFileSync(path.join(__dirname, "/products.json"), "utf-8")),
    carousel: JSON.parse(fs.readFileSync(path.join(__dirname, "/banner.json"), "utf-8")),
    categories: JSON.parse(fs.readFileSync(path.join(__dirname, "/categories.json"), "utf-8")),
    writeProductsJSON: (dataBase) => {
        fs.writeFileSync(path.join(__dirname, "../data/products.json"), JSON.stringify(dataBase), "utf-8")
    }
 }
