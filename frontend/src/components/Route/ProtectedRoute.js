import React from 'react'
import { useSelector } from 'react-redux'
import {  Route, Redirect } from 'react-router-dom'

const ProtectedRoute = ({isAdmin, component: Component, ...rest}) => {
    const {loading,isAuthUser,user}= useSelector(state=>state.user)
  return (
    <>
    {loading === false && (
    <Route 
    {...rest}
    render={(props)=>{
        if (!isAuthUser) {
            return <Redirect to="/login"/>
        }
        if (isAdmin === true && user.role !== 'admin') {
          return <Redirect to={'/login'}/>
        }
        return <Component {...props}/>
    }}
    
    />)
    
    }
    </>
  )
}

export default ProtectedRoute