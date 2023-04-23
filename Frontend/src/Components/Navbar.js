import React, { useContext } from 'react'
import { auth } from '../firebase'
import appContext from '../Context/AppContext'
import { Link } from 'react-router-dom';
import {  signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
    const {currentUser,setcurrentUser} = useContext(appContext)
    let navigate=useNavigate()
    const handleLogOut = () => {
        signOut(auth).then(() => {
            localStorage.setItem('userData',false)
            navigate('/login')
            // Sign-out successful.
          }).catch((error) => {
            console.log(error);
            // An error happened.
          });
        // setcurrentUser(null)
        // signOut()
    }
  return (
    <div>

<nav class="navbar navbar-dark primary-colo cyan lighten-5 ">
  <a class="navbar-brand  " href="#"  >
  <b className='px-1' style={{color:"red",fontSize:"30px"}}>t</b>
  <b className='px-1' style={{color:"blue",fontSize:"30px"}}>o</b>
  <b className='px-1' style={{color:"#F4AE01",fontSize:"30px"}}>d</b>
  <b className='px-1' style={{color:"green",fontSize:"30px"}}>o</b>
  </a>
  <ul class="navbar-nav teal lighten-2 rounded px-1 ml-auto">
                        <li class="nav-item dropdown active rounded overflow-hidde">
                            <a class="nav-link  p-1 dropdown-toggle" id="navbarDropdownMenuLink-4" data-toggle="dropdown"
                                aria-haspopup="true" aria-expanded="false">
                                <img src={currentUser.photoURL} className={`rounded-circle    align-self-center`} alt="" style={{ "width": "35px", "height": "35px" }} /> <b> {currentUser.displayName} </b></a>
                            <div class="dropdown-menu dropdown-menu-right dropdown-info" aria-labelledby="navbarDropdownMenuLink-4">
                                <Link class="dropdown-item" onClick={handleLogOut}  >Log out</Link>

                            </div>
                        </li>
                    </ul>
</nav>
    </div>
  )
}
