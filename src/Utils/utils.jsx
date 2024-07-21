export const OrdersService ={
    getPrevOrders(orders){
        return orders.filter(ele=>ele.isPaymentCompleted===true)
    },
    getCart(orders){
        return orders.filter(ele=>ele.isPaymentCompleted===false)
    }
}



export const ProductService = {
    fetchProducts(){
        return fetch(`https://ecomdata-opbq.onrender.com/products`,
        {method:'GET'})
    },
    getProdByProdID(products,productId){
        return products.find(prod=> prod.id == productId)
    }
}

export const BrandsService = {
    fetchBrands(){
        return fetch(`https://ecomdata-opbq.onrender.com/brands`,{method:'GET'})
    },
    getBrandByBrandId(brands,brandId){
  return brands.find(ele=>ele.id==brandId)
    }
}

export const CategoryService = {
    fetchCategories(){
        return fetch(`https://ecomdata-opbq.onrender.com/categories`,{method:'GET'})
    },
    getCategoryByCategoryId(category,catId){
  return category.find(ele=>ele.id==catId)
    }
}