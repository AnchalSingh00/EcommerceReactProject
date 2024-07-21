import React from 'react'
import Card from 'react-bootstrap/Card';

function Order(props) {
    let{orderId,productId,userId,isPaymentCompleted,quantity,price,productName,onBuyNowClick,onDeleteClick} = props
    // console.log('orders');
  return (
    <Card className='my-3 shadow mx-auto' style={{ width: '18rem' }}>
    <Card.Body>
      <Card.Title className='mb-3 bg-dark text-light text-center p-2'>{productName}</Card.Title>
      <Card.Text>Price= ${price/100}.00</Card.Text>
      <Card.Text>Quantity= {quantity}</Card.Text>

      {
        isPaymentCompleted===true ?
        ''
        :
        <table className='table table-bordered'>
        <tbody>
            <tr>
                <td>
                    <button
                    onClick={()=>onBuyNowClick(orderId,userId,productId,quantity)}
                    className='btn btn-outline-warning  text-dark'>Buy Now</button>
                </td>
                <td>
                    <button 
                    onClick={()=>onDeleteClick(orderId)}
                    className='btn btn-outline-danger text-dark'>Remove Item</button>
                </td>
            </tr>
        </tbody>
      </table>
      }
    </Card.Body>
  </Card>
  )
}

export default React.memo(Order)