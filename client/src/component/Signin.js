import React, { useState } from 'react'
import M from 'materialize-css'
import { Link, useHistory } from 'react-router-dom'
import PixelphantLogo from '../image/logo.png'
const Signin = () => {

    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")

    let history = useHistory()

    const SigninData = (e) =>{
        e.preventDefault()
        fetch('/signin', {
            method: "post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email, password
            })
        }).then(res => res.json())
        .then(data=>{
            if(data.error){
                M.toast({  html: data.error,classes: "#ef5350 red lighten-1" })
            }
            else{
                M.toast({ html: data.message,classes:"#43a047 green darken-1" })
                localStorage.setItem('signin', data)
                history.push('/')
            }
        })
    }

    return (
        <div className="signin_section">
        <div className="main_menu">
        <div className="left_menu">
                <div className="center_div">
                <h2>Welcome To Pixelphant</h2>
                    <p>signin to continue our application</p>
                </div>
            </div>
            <div className="right_menu">
                <div className="signin_header">
                    <img src={PixelphantLogo} />
                    <button className="google_btn">sign in with google</button>
                    <div className="sm_design">
                        <span></span>
                        <p>Or signin with email</p>
                        <span></span>
                    </div>
                </div>

            <div className="form" >
                <form>
                    <div className="form-group ">
                        <label>Email Address</label>
                        <input type="email" name="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)}  />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" name="password" placeholder="" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)}  />
                    </div>
                    <button onClick={(e) => SigninData(e)} className=" signin_btn">Signin</button>
                    <div className="signin_footer_section">
                        <Link to="/user/forget_password" className="forgot_pass" >Forgot Your Password?</Link>
                        <p className="signup_link">Don't have a account? <Link className="signup_danger" to="/signup" >Signup</Link></p>
                    </div>
                </form>
            </div>
            </div>
        </div>
        </div>
    )
}

export default Signin
