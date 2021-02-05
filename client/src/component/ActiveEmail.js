import React,{ useState, useEffect } from 'react'
import { useParams,useHistory } from 'react-router-dom'
import axios from 'axios'
import M from 'materialize-css'

const ActiveEmail = () => {

    const { activation_token } = useParams()
    const history = useHistory();



    useEffect(() =>{
       if(activation_token){
            const activationEmail = async ( ) =>{
                try{
                    const res = await axios.post('/activation', { activation_token })
                    M.toast({ html: res.data.message })
                    history.push('/')
                }
                catch(error){
                    console.log('Something went wrong')
                }
            } 
            activationEmail();
       }
    },[activation_token])

    return (
        <div>
            
        </div>
    )
}

export default ActiveEmail
