import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../Context/Contextfile';
import { useNavigate } from 'react-router-dom';

function Login() {

let [logindata, setlogindata] = useState({
  myemail:'scott@test.com', mypass:'Scott123' 
})


// from context

let {condata, setcondata}= useAuth()
// console.log(userdata);

// navigate
let navigate = useNavigate()

// react toastify
const notifysuccess = () => toast.success('🦄 Log In Successful!', {
  position: "top-left",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
  }); 

  const notifyunsuccess = () => toast.error('🦄 Log In Unsuccessful!', {
    position: "top-left",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    }); 

let handleChange = (e) =>{
  setlogindata({...logindata,[e.target.name]:e.target.value})
}

let handlesubmit = async(e) =>{
  e.preventDefault()
  // console.log(logindata);
let response = await fetch(`https://ecomdata-opbq.onrender.com/users?email=${logindata.myemail}&password=${logindata.mypass}`,{method:'GET'})
// console.log(response);
if(response.status===200){
  let responsebody = await response.json()
// console.log(responsebody);

if(responsebody.length>0){
// send data in context 
let getuser = responsebody[0]
// console.log(getuser);
setcondata({...condata, isLogged:true, userid:getuser?.id ,userdata:getuser})

  notifysuccess()
  // redirect to  dashboard
 setTimeout(() => {
  navigate('/store')
 }, 3000);
} else{
  notifyunsuccess()
}
} else{
  notifyunsuccess()
}

}

  return (
    <div className='border border-4 my-3 w-25 m-auto p-3 rounded-4 mt-5' style={{backgroundColor:'#cb7351', boxShadow:'2px 2px 30px black'}}>
  <h3 className="text-center text-bg-dark p-3 rounded-2 w-75 mx-auto text-light ">SIGN IN🗝️</h3>
  <form onSubmit={handlesubmit}>
  <Form.Group className="mb-3 my-4" controlId="exampleForm.ControlInput1">
        <Form.Label className='fw-bold'>Email address</Form.Label>
        <Form.Control 
        name='myemail'
        value={logindata.myemail}
        onChange={handleChange}
        type="email" placeholder="name@example.com" />
      </Form.Group> 
      <Form.Group className="mb-3 my-4" controlId="exampleForm.ControlInput1">
        <Form.Label className='fw-bold'>Password</Form.Label>
        <Form.Control 
        name='mypass'
        value={logindata.mypass}
        onChange={handleChange}
        type="text" placeholder="Password" />
      </Form.Group>
      <button type='submit' className='btn btn-warning mx-auto w-50 d-block'>Sign In</button>          
  </form>
  <ToastContainer
  position="top-left"
  autoClose={5000}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
  theme="colored"/>
    </div>
  )
}

export default Login








                                                                    
                                                   
 