import React, { useState } from 'react'
import { useEffect } from 'react'
import { useAuth } from '../Context/Contextfile'
import { OrdersService, ProductService } from '../Utils/utils'
import { useCallback } from 'react'
import Button from 'react-bootstrap/Button';
import Order from './Order'

function Dashboard() {

let[orders,setOrders] = useState([])

// get userid from context and fetch the orders
let{condata} = useAuth()

// get data from server

let loadDataFromdatabase = useCallback (async()=>{

        let orderresponse = await fetch(`https://ecomdata-opbq.onrender.com/orders?userId=${condata?.userid}`)
        let orderresponsebody = await orderresponse.json() 
        console.log(orderresponsebody);
        
        // get all products
        let productresponse = await ProductService.fetchProducts()
        if(productresponse.ok){
            let productresponsebody = await productresponse.json()
        
            // merge both orders and product
            orderresponsebody.forEach(ele=>{
                ele.produuct = ProductService.getProdByProdID(
                    productresponsebody,
                    ele.productId
                )
            })
            console.log(orderresponsebody);
            setOrders(orderresponsebody)
        }
          },[condata.userid])

useEffect(()=>{
           loadDataFromdatabase()                                               
},[condata.userid,loadDataFromdatabase])

// onBuyNow click
let onBuyNowClick = useCallback (async(orderId,userId,productId,quantity)=>{
if(window.confirm('Do You Want to Purchase')){
  let updateOrder ={
    id:orderId,
     userId:userId,
     productId:productId,
    quantity:quantity,
    isPaymentCompleted:true
  }
  let orderbuyresponse = await fetch(`https://ecomdata-opbq.onrender.com/orders/${orderId}`,{method:'PUT',body:JSON.stringify(updateOrder),headers:{"Content-Type":"application/json"}})

  if(orderbuyresponse.ok){
    loadDataFromdatabase()
  }
  else{
    alert('Error 404')
  }
}
},[loadDataFromdatabase])

// for delete
let onDeleteClick = useCallback(async(orderId)=>{

  if(window.confirm('Do You Want To Remove The Item')){
    let orderresponse = await fetch(`https://ecomdata-opbq.onrender.com/orders/${orderId}`,{method:'DELETE'})
    if(orderresponse.ok){
      loadDataFromdatabase()
    }
    else{
      alert('Something Error Happend 404')
    }
  }

},[loadDataFromdatabase])

  return (
    <div className="container border border-3 p-3 mt-3">
        <h1 className='text-center text-bg-danger p-2 fst-italic'>Dashboard
        <img
        onClick={loadDataFromdatabase}
        style={styles.Image} src="https://cdn-icons-png.flaticon.com/128/59/59417.png" alt="" />
        </h1>
        <div className='row container  m-auto gap-4'>
          {/* previous order section */}
        <div className="col-5  offset-1">
          <h3 className='mt-1 text-center bg-info'>Previous Order
          <img style={styles.Image} src="https://cdn-icons-png.flaticon.com/128/3081/3081559.png" alt="" />
          <Button variant="dark" className='ms-3 rounded-circle '>{OrdersService.getPrevOrders(orders).length}</Button>
          </h3>
          {
            OrdersService.getPrevOrders(orders).length ==0 ?
            <h1 className='text-center fw-bold'>No Previous Order</h1>   : ''
          }
          {
            OrdersService.getPrevOrders(orders).map((ele,index)=>(
              <Order
              key={index}
             
              orderId={ele.id}
              productId={ele.productId}
              userId={ele.userId}
              isPaymentCompleted={ele.isPaymentCompleted}
              quantity={ele.quantity}
              price={ele.produuct.price}
              productName={ele.produuct.productName}
              onBuyNowClick={onBuyNowClick}
              onDeleteClick={onDeleteClick}
              />
            ))
          }
        </div>

        {/* Get Cart section */}
        <div className="col-5 ">
        <h3 className='mt-1 text-center bg-danger'>My Cart
          <img style={styles.Image} src="https://cdn-icons-png.flaticon.com/128/891/891407.png" alt="" />
          <Button variant="dark" className='ms-3 rounded-circle '>{OrdersService.getCart(orders).length}</Button>
          </h3>
          {
            OrdersService.getCart(orders).length ==0 ?
            <h1 className='text-center fw-bold'>Cart Is Empaty</h1>   : ''
          }
          {
            OrdersService.getCart(orders).map((ele,index)=>(
              <Order
              key={index}
              orderId={ele.id}
              productId={ele.productId}
              userId={ele.userId}
              isPaymentCompleted={ele.isPaymentCompleted}
              quantity={ele.quantity}
              price={ele.produuct.price}
              productName={ele.produuct.productName}
              onBuyNowClick={onBuyNowClick}
              onDeleteClick={onDeleteClick}
              />
            ))
          }
        </div>
    </div>
    </div>
  ) 
}

export default Dashboard



 let styles={
    Image:{
        height:'50px',width:'50',color:'White', marginLeft:'50px'
    }
 }