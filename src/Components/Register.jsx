import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../Context/Contextfile';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Register() {

// state to handle input fields
let [state,setState] = useState({
  email:'',password:'',fullName:'',
  dateOfBirth:'',gender:'',country:'',receiveNewsLetters:false
})

// from context

let {condata, setcondata}= useAuth()
// console.log(userdata);

// navifgate 
let navigate = useNavigate()
// react toastify
const notifysuccess = () => toast.success('🦄 Register Successful!', {
  position: "top-left",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
  }); 

  const notifyunsuccess = () => toast.error('🦄 Register Unsuccessful!', {
    position: "top-left",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    }); 


let handleChange = (e)=>{
  setState({...state,[e.target.name]:e.target.value})
}

let handleCheck = (e)=>{
  setState({...state,[e.target.name]:e.target.checked})
}

  // data for countries dropdown
let countries = [
  {id:1,name:'INDIA'},
  {id:2,name:'Nepal'},
  {id:3,name:'Bhutan'},
  {id:4,name:'Mexico'},
  {id:5,name:'South Africa'}

]

//handleregister
let handleRegister = async() =>{
  // console.log(state);
  let response = await fetch(`https://ecomdata-opbq.onrender.com/users`,{method:'POST',body:JSON.stringify(state),headers:{"Content-type":"application/json"}})
  // console.log(response);
  if(response.ok){
    let responseBody = await response.json()
    // alert ('success')
    // console.log(responseBody);
    let getuser = responseBody
    //  console.log(getuser);
    setcondata({...condata, isLogged:true, userid:getuser?.id ,userdata:getuser})

    notifysuccess()
     // redirect to  dashboard
 setTimeout(() => {
  navigate('/')
 }, 5000);
  }else{
    //allert ('Unsuccess')
    notifyunsuccess()
  }
}

  return (
    <div>
    <div className=" border border-3 w-50 m-auto p-4 mt-3 rounded-4"  style={{backgroundColor:'#b55921', boxShadow:'2px 2px 30px black'}}>
      <h3 className="text-center text-bg-info p-3 rounded-2 w-50 mx-auto">REGISTER📝</h3>
      {/* email */}
      <div className="my-3">
        <label htmlFor="" className='fw-bold'>EMAIL ::  </label>
      <Form.Control
      name='email' value={state.email} onChange={handleChange}
      className='w-75 m-auto d-inline-block ms-2'
      type="text" placeholder="Email" />
      </div>
      {/* password */}
      <div className="my-3">
        <label htmlFor=""  className='fw-bold' >Password ::  </label>
      <Form.Control
         name='password' value={state.password} onChange={handleChange}
      className='w-75 m-auto d-inline-block ms-2'
      type="text" placeholder="Password" />
      </div>
      {/* fullname */}
      <div className="my-3">
        <label htmlFor="" className='fw-bold' >UserName ::  </label>
      <Form.Control
       name='fullName' value={state.fullName} onChange={handleChange}
      className='w-75 m-auto d-inline-block ms-2'
      type="text" placeholder="UserName" />
      </div>
      {/* dateofbirth */}
      <div className="my-3">
        <label htmlFor="" className='fw-bold' >Date Of Birth ::  </label>
      <input type="date"
       name='dateOfBirth' value={state.dateOfBirth} onChange={handleChange}
      className='form-control w-75 m-auto d-inline-block ms-2'
      />
      </div>
      {/* country */}
      <div className="my-3">
        <label htmlFor="" className='fw-bold' >Country ::  </label>
        <Form.Select
         name='country' value={state.country} onChange={handleChange}
        aria-label="Default select example"
         className='form-control w-75 m-auto d-inline-block ms-2'
        >
    <option>Open this select menu</option>
  {
    countries.map(ele=>{
      return <option key={ele.id} value={ele.name}>{ele.name}</option>
    })
  }
  </Form.Select>
      </div>
      {/* gender */}
      <div className="my-3">
        <label htmlFor="" className='fw-bold' >Gender :: </label>

        <Form.Check // prettier-ignore
         className=' d-inline-block ms-2'
          type='radio'
          name='gender'
          label={'Male'}
          value='male'
          onChange={handleChange}
          checked={state.gender==='male' ? true :false}
        />
          <Form.Check // prettier-ignore
         className=' m-auto d-inline-block ms-2'
          type='radio'
          name='gender'
          label={'Female'}
          value='female'
          onChange={handleChange}
          checked={state.gender==='female' ? true :false}
          // checked={true}
        />
    
      </div>
{/* recieve newsletter */}
<div className="my-3  w-50 m-auto text-center fs-2">
<Form.Check // prettier-ignore
          type={'checkbox'}
          name='receiveNewsLetters'
          onChange={handleCheck}
          label={`RecieveNewsLetter`}
          checked={state.receiveNewsLetters === true ? true : false}
        />
</div>
{/* register */}
<button 
onClick={handleRegister}
className="btn btn-warning fst-italic  fw-bolder  d-block m-auto w-75 p-1 fs-3 ">REGISTER</button>
    </div>
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
  theme="colored"
 
  />
  </div>
  )
}

export default Register

