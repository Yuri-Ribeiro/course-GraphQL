module.exports = {
    discountPrice(product){
        return product.price * (1 - product.discount)
    }
}