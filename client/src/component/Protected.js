import React, { useState } from 'react'
import { Redirect, Route } from 'react-router-dom'

const Protected = ({ component: Component, ...rest }) =>{
    return (
        <div className="protected_section" >
            <div className="protected_container">
            <Route 
            { ...rest }
                render={(props) =>
                    localStorage.getItem('signin') ? (
                        <Component { ...props } />
                    ):
                    <Redirect to="/signin" />
                }
              />
            </div>
        </div>
    )
}

export default Protected