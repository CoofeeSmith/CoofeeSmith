import React, { useContext, useEffect } from 'react'
import { Link, useNavigate, Redirect } from 'react-router-dom'
import UserContext from './UserDetails'
import SimpleImageSlider from "react-simple-image-slider";

const Home = () => {

  const images = [
    { url: "./images/beer1.jpg" },
    { url: "./images/beer2.jpg" },
    { url: "./images/beer3.jpg" },
  ];

  let navigate = useNavigate()
  const user = useContext(UserContext)
  console.log(user)

  //If user is already logged in via coolies/storage (TBD by Colton) then redirect to their landing page
  useEffect(() => {
    if (user) {
      navigate('/userlanding')
    }
  }),
    []

  function loginClick() {
    navigate('/login')
  }

  function createClick() {
    navigate('/createuser')
  }

  if (!user) {
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
       <div className="home">
          <button className="create-Btn" onClick={() => createClick()}>
            New to FindMyBrews? Click here for your Passport!
          </button>
          <button className="login-Btn" onClick={() => loginClick()}>
            Already have your Passport? Click here to log in!
          </button>
          {/* <Link to="/home">Home</Link>  */}
        </div>
      </html>
    )
    // } else {
    //   // <Redirect to="/userlanding" />;
    //   navigate('/createuser');
    // }
  }
}

export default Home
