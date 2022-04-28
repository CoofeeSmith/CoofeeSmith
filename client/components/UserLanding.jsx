
import React, { useEffect, useState, useContext } from 'react';
import StateBreweries from './StateBreweries';
import VisitedBreweries from './VisitedBreweries';
import UserContext from './UserDetails';
import axios from 'axios';
import Navbar from './Navbar';

const UserLanding = ( ) => {
  //Batching state changes in React leading to onClick update lags????
  const [stateBreweries, setStateBreweries] = useState();
  const [visBreweries, setVisBreweries] = useState();
  //const user = useContext(UserContext);
  console.log('in userLanding');
  const [user, setUser] = useState({state: false, usersid: false,})
  const hide = false;

  // FETCH CALL TO GET USER INFORMATION
  // useEffect(() => {
  //   const response = await axios.get('/api', {
  //     params: { state: user.state, id: user.userid }
  //   })
  //   // fetch call to the server to get the body.userInfo.username
  //       //get request to /getuser
  //       //need to return state and id
  //   // fetch call to api to get the information based on body.userInfo.username
  // }, [])
  useEffect(() =>{
    fetch('/api/getUser')
      .then(response => response.json())
      .then(data => {
        console.log('data after fetch ', data)
        setUser({state: data.homestate, usersid: data.id})
        // user.state = data.homestate;
        // user.usersid = data.id;
        console.log('USER OBJECT INFO', user)
      })
  },[]) 


  useEffect(( ) => {  
    console.log('getBreweries useEffect happens')
    //Obtaining state upon user hitting landing page - user's state breweries and visited breweries
    const getBreweries = async ( ) => {
      console.log('user in getBreweries call', user);
          console.log('in getBreweries try block')
          try {
            const response = await axios.get('/api', {
              params: { state: user.state, id: user.usersid },
            })
            // .then(()=>{
            //   setStateBreweries(response.data.getBreweries)
            //   setVisBreweries(response.data.visited)
            // })
            console.log('responseee', response)
            setStateBreweries(response.data.getBreweries)
            setVisBreweries(response.data.visited)
          } catch (error) {
            console.log(error)
          }
    }
    if (user.usersid !== false){
      getBreweries()
    } 
  }, [user.usersid]);
  //} 

  useEffect(() => {
    console.log('State has changed');
    //state has changed but must be batching updates becaues not rerendering right away
  }, [stateBreweries, visBreweries]);
  
  const addStateToVisited = async (breweryDetails) => {
    // Add state brewery to visited brewery list
    const response = await axios.post('/visited/add', {
      addVisited: {
        breweryid: breweryDetails.id,
        breweryname: breweryDetails.name,
        brewerytype: breweryDetails.brewery_type,
        brewerystate: breweryDetails.state,
        brewerycity: breweryDetails.city,
        breweryphone: breweryDetails.phone,
        userId: user.usersid,
      },
      // params: { userId: user.usersid }, //Having trouble sending over user id as separate params
    })
    
    //Skips re-rendering sometimes....think due to automatic batching...

    // LOOK HERE FOR ISSUE
    const dummy = await response
    setVisBreweries([...dummy.data.visited]);
    console.log(dummy);

    
  }

  const removeVisited = async (breweryDetails) => {
    //Add state brewery to visited brewery list
    const response = await axios.delete('/visited/delete', {
      data: {
        breweryid: breweryDetails.id,
        breweryname: breweryDetails.name,
        brewerytype: breweryDetails.brewery_type,
        brewerystate: breweryDetails.state,
        brewerycity: breweryDetails.city,
        breweryphone: breweryDetails.phone,
        userId: user.usersid,
      },
      // params: { userId: user.usersid },
    })
    const dummy = await response
    setVisBreweries([...dummy.data.visited]);
    console.log(dummy);
  }

  if (stateBreweries) {
    //Only rendering after mount side effect runs to retrieve state breweries
    return (
      <div className="containerStyle">
        {/* <div className='navbarHolder'> */}
            <Navbar hide = {hide}/>
        {/* </div> */}
        <StateBreweries
          stateBreweries={[...stateBreweries]}
          addStateToVisited={addStateToVisited}
        />
        <VisitedBreweries
          visBreweries={[...visBreweries]}
          removeVisited={removeVisited}
        />
      </div>
    )
  }

}

export default UserLanding;
