import React , {useState} from 'react';
import './styles/RegisterStyle.css'
import img_register from './images/register.JPG'
import Footer from './Footer.js'
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import validator from 'validator' ;

const Register = () =>{
  const history = useHistory();
  const [user, setUser] = useState({name:"",email:"",phone:"",pan:"",password:"",pan_image:null,aadhaar_image:null});

  let name,value;

  const handleInputs = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]:value})
  }

  const validatePhoneNumber = (number) => {
    const isValidPhoneNumber = validator.isMobilePhone(number)
    return (isValidPhoneNumber)
   }


   const validateEmail = (email) => {
    const isValidEmail = validator.isEmail(email)
    return (isValidEmail)
  }

  const PostData = async (e) => {
    e.preventDefault();
    const {name,email,phone,pan,password,pan_image,aadhaar_image} = user;
    if(validatePhoneNumber(phone)  && validateEmail(email))
    {
    const res = await fetch ("/register", {
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        name,email,phone,pan,password,pan_image,aadhaar_image
      })
    });
    const data = await res.json();

    if(data.status == 422 || !data  )
    {
      window.alert("Invalid Registration");
      console.log("Invalid Registration");
    }else
    {
      window.alert('Registration Successful ' + data.secrets.base32);
      console.log("Registration successful");
      history.push("/login");
    }
  }
else
{
  window.alert("Enter valid input");
}}

  return (
    <div className='register'>
      <div className="flex-container-register">

         <div className="flex-child-register ">
         <img className="img_register " src={img_register} alt="personal finance" />
         </div>

         <div className="flex-child-register">
         <div className="center-register">
      <h1>Register</h1>
      <form method="POST">
        <div className="txt_field-register">
          <input type="text" name="name" value={user.name} onChange={handleInputs} required/>
          <span></span>
          <label>Name</label>
        </div>
        <div className="txt_field-register">
          <input type="text" name="email" value={user.email} onChange={handleInputs} required/>
          <span></span>
          <label>Email</label>
        </div>
        <div className="txt_field-register">
          <input type="text" name="phone" value={user.phone} onChange={handleInputs} required/>
          <span></span>
          <label>Mobile No.</label>
        </div>
        <div className="txt_field-register">
          <input type="text" name="pan" value={user.pan} onChange={handleInputs} required/>
          <span></span>
          <label>Pan No.</label>
        </div>
        <div className="txt_field-register">
          <input type="password" name="password" value={user.password} onChange={handleInputs} required/>
          <span></span>
          <label>Password</label>
        </div>
        <input
        type="file"
        accept="image/*"
        name="pan_image"
        value={user.pan_image} onChange={handleInputs}
        style={{ display: 'none' }}
        id="contained-button-file"
      />
      <label htmlFor="contained-button-file">
        <Button className = "button-upload" variant="contained"  component="span" style={{ backgroundColor: "#00cc00",margin: "5px" , marginBottom: "10px"}}>
          Upload PAN 
        </Button>
        </label>
        <input
        type="file"
        accept="image/*"
        name="aadhaar_image"
        value={user.aadhaar_image} onChange={handleInputs}
        style={{ display: 'none' }}
        id="contained-button-file1"
      />
      <label htmlFor="contained-button-file1">
        <Button className = "button-upload" variant="contained"  component="span" style={{
        backgroundColor: "#00cc00",
        margin: "5px" , 
        marginBottom: "10px"
    }}>
          Upload Aadhaar
        </Button>
        </label>
        <input className="submit-register" type="submit" value="Register" onClick={PostData} />
      </form>
    </div>
         </div>
       
      </div>
      <Footer/>
    </div>
  )
};

export default Register;
