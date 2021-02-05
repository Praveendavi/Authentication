import React,{ useState } from 'react'
import M from 'materialize-css'
import { Link, useHistory } from 'react-router-dom'
import PixelphantLogo from '../image/logo.png'

const Signup = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    let history = useHistory()

    const SignupData = (e) =>{
        e.preventDefault()
        fetch('/signup',{
            method: "post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
                email,
                password
            })
        }).then(res => res.json())
        .then(data=>{
            if(data.error){
                M.toast({ html: data.error })
            }
            else{
                M.toast({ html: data.message })
                history.push('/signin')
            }
        }).catch(error=>{
            console.log(error)
        })
    }

    return (
        <div className="signin_section">
           <div className="main_menu">
          
            <div className="right_menu">
                <div className="signin_header">
                    <img src={PixelphantLogo} />
                    <div className="sm_design">
                        <span></span>
                        <p>Signup with email</p>
                        <span></span>
                    </div>
                </div>
                <form>
         <div className="form-group">
                <label>Name: </label>
                <input type="text" className="form-control" name="name" value={name} onChange={(e) => setName(e.target.value)}  />
            </div>
            <div className="form-group">
                <label>Email: </label>
                <input type="email" className="form-control" name="email" value={email} onChange={(e) => setEmail(e.target.value)}  />
            </div>
            <div className="form-group">
                <label>Password: </label>
                <input type="password" className="form-control" name="password" value={password} onChange={(e) => setPassword(e.target.value)}  />
            </div>
                    <button onClick={(e) => SignupData(e)} className=" signin_btn">Signup</button>
                    <div className="signin_footer_section">
                        <p className="signup_link">Already have a account? <Link className="signup_danger" to="/signin" >Signin</Link></p>
                    </div>
                </form>
          </div>
          <div className="left_menu">
                <div className="center_div">
                    <h2>Welcome To Pixelphant</h2>
                    <p>signup to continue our application</p>
                </div>
            </div>
        </div>
        </div>
        
    )
}

export default Signup
