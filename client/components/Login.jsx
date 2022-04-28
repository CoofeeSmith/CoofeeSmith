import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
// import UserLanding from './UserLanding'
import SimpleImageSlider from "react-simple-image-slider";

const images = [
  { url: "images/beer1.jpg" },
  { url: "images/beer2.jpg" },
  { url: "images/beer3.jpg" },
];



const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  // const [isLoggedIn, setIsLoggedIn] = useState(true);

  let navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault() //So that form submission doesn't trigger a page refresh

    // send the username and password to the server
    try {
      const response = await axios.post('/login', {
        userInfo: {
          username: username,
          password: password,
        },
      })
      //If success then update context for logged in user and redirect them...
      if (response.data === 'Login Success') {
        // setIsLoggedIn(true);
        // console.log(isLoggedIn)
        navigate('/userlanding') //if successfull, send to UserLanding route
      }
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
    // params: { userId: user.usersid }, //Having trouble sending over user id as separate params
  }
  return (
      <html>
       <div>
        <SimpleImageSlider
          width={896}
          height={504}
          images={images}
          showBullets={true}
          showNavs={true}
        />
      </div> 
        <div className="loginForm">
          <h1>Login</h1>
          <div>
            <form onSubmit={handleSubmit}>
              <div>
                <input
                  autoFocus
                  className="submitItem"
                  name="Username"
                  type="text"
                  placeholder="Username"
                  onChange={({ target }) => setUsername(target.value)}
                ></input>
              </div>
              <div>
                <input
                  className="submitItem"
                  name="Password"
                  type="password"
                  placeholder="Password"
                  onChange={({ target }) => setPassword(target.value)}
                ></input>
              </div>
              <input className="submitButton" type="submit" value="Login"></input>
            </form>
            <Link to="/main">
              <button className="backButton">
              Back to Main Page
              </button>
          </Link>
          </div>
        </div>
      </html>
)}


export default Login
