const { formatPrice } = require('../../lib/utils')


const Product = require('../model/Category')
const File = require('../models/File')

module.exports = {
    async index(req, res) {
       let results = await Product.all()
       const Products = results.rows

       if (!Products) return res.send("products not found!")

       async function getImage(productId) {
           let  results = await Product.files(productId)
           const files = results.rows.map(filles => `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`)

           return files[0]
       }

       const ProductsPromise = products.map(async product => {
           product.img = await getImage(product.id)
           product.oldPrice = formatPrice(product.old_price)
           product.price = formatPrice(product.price)
           return product
       }).filter((product, index) => index > 2 ? false : true )

       const lastAdded = await Promise.all(productsPromise)

       return res.render("home/index", { products: lastAdded})
    }
}