import React, { useContext } from 'react'
import appContext from '../Context/AppContext'

export const SignIn = () => {
    const {signIn} = useContext(appContext)
  return (
    <div className="center h-100 ">
    <div className="p-5 rounded-lg blue">
    <div className="btn btn-block white rounded-lg p-1 pr-3 " onClick={signIn} style={{fontSize:"16px"}} >
    <img src={require('../Images/google.png')} alt="" width={60} />
    <b>Sign In With Google</b>
    </div>
    </div>
    </div>
  )
}
