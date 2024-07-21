import React, { useState } from 'react'
import { Card } from 'react-bootstrap'

function Product({product,onAddtoCart}) {

let [prod] = useState(product)

// let rating = [...Array(prod.rating).keys()].map(ele=>(
//   <i  class="fa-solid fa-star" key={ele}></i>
// ))
// console.log(rating);

  return (
    <Card style={{ width: '18rem' }}>
    <Card.Body>
      <Card.Title className='text-info '>{prod?.productName}</Card.Title>
      <Card.Subtitle className="mb-2 text-muted d-inline-block">#{prod?.brand?.brandName}</Card.Subtitle>
      <Card.Subtitle className="mb-2 text-muted d-inline-block  ms-4 ">#{prod?.category?.categoryName}</Card.Subtitle>
      <Card.Text>
      Price = ${((prod?.price/100).toFixed(2))}
      </Card.Text>

      {
       [...Array(prod?.rating).keys()].map(n=>{
        return  <i  className="text-success fa-solid fa-star" key={n}></i>
       })
      }

{
       [...Array(5-prod?.rating).keys()].map(n=>{
        return  <i className="fa-regular fa-star" key={n}></i>
       })
      }

{
  
prod.isOrdered===true ? 
(
  <p className="text-success">Added to Cart</p>
)
:
(
  <button
onClick={()=>onAddtoCart(prod)}
className="btn btn-outline-success d-block ms-auto">
<i className="fa-solid fa-cart-plus"></i> Add to Cart</button>
)
}


    </Card.Body>

  </Card>
  )
}

export default React.memo(Product)