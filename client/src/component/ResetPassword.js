import React, { useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios'
import M from 'materialize-css'



const ResetPassword = () => {

    const [ password, setPassword ] = useState("")
    const [ compassword, setCompassword ] = useState("")
    const history = useHistory();

    const { token } = useParams()


    const handleResetPassword = async(e) =>{
        if(!password){
            return M.toast({ html : "Plase fill the all fields" })
        }
        if(password.length < 6){
            return M.toast({ html : "Password is must be at least 6 character" })
        }
        
        if(password !==  compassword){
            return M.toast({ html: 'Password is not match' })
        }
        try{
            const res = await axios.post('/user/reset_password', { password },{
                headers: { Authorization: token }
            })
            M.toast({ html: res.data.message })
            history.push('/signin')
        }
        catch(err){
            console.log(err)
        }
    }

    return (
        <div className="reset_password">
        <div className="reset_password_container">
            <div className="reset_header">
                <h4>Reset Your Password</h4>
            </div>
            <label htmlFor="password">Password </label>
            <input type="password" name="password" id="password" value={password} placeholder="Enter Your New Password" onChange={(e) => setPassword(e.target.value)} />
            <label htmlFor="compassword">Comfirm Password </label>
            <input type="password" name="compassword" id="compassword" value={compassword} placeholder="Confirm Password" onChange={(e) => setCompassword(e.target.value)} />
            <button onClick={handleResetPassword} className="reset_btn" >Reset Password</button>
        </div>
            
        </div>
    )
}

export default ResetPassword
