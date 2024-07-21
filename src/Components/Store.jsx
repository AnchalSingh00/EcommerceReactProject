import React, { useCallback, useEffect, useState } from 'react'
import { BrandsService, CategoryService, ProductService } from '../Utils/utils'
import { Form, ListGroup } from 'react-bootstrap'
import Product from './Product'
import { useAuth } from '../Context/Contextfile'


function Store() {

    let [txt,settxt] = useState('')
    let [brands,setbrands] = useState([])
    let [categories,setcategories] = useState([])
    let [products,setProducts] = useState([])
    let [productToShow , setproductToShow] = useState([])

    // console.log(brands,categories,products);

useEffect(()=>{
    (async()=>{
 //get Brands from db
 let brandsResponse = await BrandsService.fetchBrands()
let brandsResponseBody = await brandsResponse.json()
// console.log(brandsResponseBody);
brandsResponseBody.forEach(brand=>{
    brand.isChecked=true
})
setbrands(brandsResponseBody)

//get categories from db
let categoriesResponse = await CategoryService.fetchCategories()
let categoriesResponseBody = await categoriesResponse.json()
// console.log(categoriesResponseBody);
categoriesResponseBody.forEach(cat=>{
   cat.isChecked=true
})
setcategories(categoriesResponseBody)

// get products from db
let productResponse = await fetch(`https://ecomdata-opbq.onrender.com/products?productName_like=${txt}`)
let productResponseBody = await productResponse.json()
// console.log(productResponseBody);
if(productResponse.ok){
    productResponseBody.forEach(prod=>{
        // merge brand in product
    prod.brand = BrandsService.getBrandByBrandId(
        brandsResponseBody,prod.brandId
    )
    // merge category in product
    prod.category = CategoryService.getCategoryByCategoryId(
        categoriesResponseBody,prod.categoryId
    )
    // adding is ordered in all products
        prod.isOrdered=false
    })
    
    setProducts(productResponseBody)
    setproductToShow(productResponseBody)
}

    })()

},[txt])

// updateBrandsIsChecked
let updateBrandsIsChecked = (id) =>{
console.log('ckecked ',id);
let brandsData = brands.map(ele=>{
    if(ele.id==id) ele.isChecked = !ele.isChecked
    return ele
})
setbrands(brandsData)
updateProductToShow()
}

// updateCategoryIsChecked
let updateCategoryIsChecked = (id) => {
    let catData = categories.map(ele=>{
        if(ele.id==id) ele.isChecked = !ele.isChecked
        return ele
    })
    setcategories(catData)
    updateProductToShow()
}

// get data from context
let conuser = useAuth()

// update ProductTOShow
let updateProductToShow = () => {
    // console.log('car');
    setproductToShow(
        products
        .filter((prod)=>{
            return categories.filter((cat)=>{
                return cat.id == prod.categoryId && cat.isChecked===true
            }).length > 0
        })
        .filter((prod)=>{
            return brands.filter((ele)=>{
                return ele.id == prod.brandId && ele.isChecked===true
            }).length > 0
        })
    )
       
}

// add to cart button
let onAddtoCart = useCallback(async(prod)=>{
// console.log(prod);
let newOrder = {
    userId:conuser?.condata?.userid,
    quantity:1,
    productId:prod.id,
    isPaymentCompleted:false
}
let orderRsponse = await fetch(`https://ecomdata-opbq.onrender.com/orders`,{method:'POST',body:JSON.stringify(newOrder),headers:{"Content-type":"application/json"}})
if(orderRsponse.ok){
    let orderRsponseBody = await orderRsponse.json()

let updateIsOrderedProducts = products.map(ele=>{
    if(ele.id==prod.id) ele.isOrdered = true    
    return ele
})
setProducts(updateIsOrderedProducts)
updateProductToShow()

}else{
    alert('Not Added to Cart')
}

})



  return (
    <div className=''>
        <h3 className="text-center my-3 border-bottom  border-3  border-success w-75 m-auto pb-2">Store</h3>
        <input 
        value={txt}
        onChange={(e)=>settxt(e.target.value)}
        className='form-control w-50 m-auto my-3'
        type="text" name="" id=""
        placeholder='Search Products'
        />
        <div className="row gap-2 ">
            <div className="col-12 col-sm-3 bg-info offset-1 p-3 rounded-4 ">
                {/* brands */}
                <h4 className='text-light' >BRANDS</h4>
                <ListGroup>
   {
    brands.map(brand=>(
        <ListGroup.Item key={brand.id}>
           <Form.Check
           onChange={()=>updateBrandsIsChecked(brand.id)}
           type='checkbox'
           checked={brand.isChecked}
           className='d-inline-block me-3'
           />
            {brand.brandName}
            </ListGroup.Item>
    ))
   }
    </ListGroup>
    <hr className='border border-3 border-danger'/>
                {/* categories */}
                <h4  className='text-light' >CATEGORIES</h4>
                <ListGroup>
                {
    categories.map(category=>(
        <ListGroup.Item key={category.id}>
           <Form.Check
            checked={category.isChecked}
            onChange={()=>updateCategoryIsChecked(category.id)}
           type='checkbox'
           className='d-inline-block me-3'
           />
            {category.categoryName}
            </ListGroup.Item>
    ))
   }
    </ListGroup>
                {/* categories */}
            </div>
            <div className="col-12 col-sm-7 bg-warning d-flex justify-content-evenly flex-wrap gap-4 p-3 ">
                {
                    productToShow && productToShow.map(prod=>(
                        <Product key={prod.id}
                        product={prod}
                        onAddtoCart={onAddtoCart}
                        />
                    ))
                }
            </div>
        </div>

        {/* <div>{JSON.stringify(brands)}</div> */}
        {/* <div>{JSON.stringify(categories)}</div> */}
        {/* <div>{JSON.stringify(products)}</div> */}
    </div>
  )
}

export default Store