import React,{ useState } from 'react'
import axios from 'axios'
import M from 'materialize-css'
import { useHistory, Link } from 'react-router-dom'
import { BsArrowLeft } from 'react-icons/bs'


const ForgetPassword = () => {

    const [email, setEmail] = useState("")
    const history = useHistory()

    const onInputChange = (e) =>{
            setEmail(e.target.value)
    }

    const forgotPassword = async() =>{
        try{
            const res = await axios.post('/user/forget_password', {email})
            M.toast({ html: res.data.message })
        }
        catch(error){
            return M.toast({ error : "This Email Is Does Not Exsit"  })
        }
    }


    return (
        <div className="forgot_password_section">
           <div className="forget_password_container">
                <Link className="back_arrow" to="/signin" ><BsArrowLeft /></Link>
                <h4>Forgot Your Password</h4>
                <label htmlFor="email">Enter Your Email Address</label>
                <input type="email"  name="email" id="email" onChange={onInputChange} value={email} placeholder="Enter your email address" />
                <button className="email_verify_btn" onClick={forgotPassword}>Verify Your Email</button>
            </div>
           
        </div>
    )
}

export default ForgetPassword
