import { useState, createContext, useEffect  } from 'react'
import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import Landing from './components/Landing/Landing'
import Dashboard from './components/Dashboard/Dashboard'
import SignupForm from './components/SignupForm/SignupForm'
import SigninForm from './components/SigninForm/SigninForm'

import * as authService from '../src/services/authService' // import the authservice
import * as hootService from './services/hootService'

import HootList from './components/HootList/HootList'
import HootDetails from './components/HootDetails/HootDetails'

export const AuthedUserContext = createContext(null)

const App = () => {
  const [user, setUser] = useState(authService.getUser()) // using the method from authservice
  const [hoots, setHoots] = useState([]) // Hoot posts

  useEffect(() => {
    async function getAllHoots() {
      const hootsData = await hootService.indexHoots()
      // Set state:
      setHoots(hootsData)
    }
    if (user) getAllHoots() // Hoots are not fetched if there is no user logged in
  }, [user]) // Placing user in the dependency array will cause this function to fire when:
  // 1. Page loads
  // 2. user state changes

  const handleSignout = () => {
    authService.signout()
    setUser(null)
  }

  return (
    <>
      <AuthedUserContext.Provider value={user}>
        <NavBar user={user} handleSignout={handleSignout} />
        <Routes>
          {user ? (
            // Renders dashboaord if someone signed in, 
            <>
              <Route path="/" element={<Dashboard user={user} />} />
              <Route path="/hoots" element={<HootList hoots={hoots} />} />
              <Route path="/hoots/:hootId" element={<HootDetails />} />
            </>
          ) : (
            // otherwise show public landing page
            <Route path="/" element={<Landing />} />
          )}
          <Route path="/signup" element={<SignupForm setUser={setUser} />} />
          <Route path="/signin" element={<SigninForm setUser={setUser} />} />
        </Routes>
      </AuthedUserContext.Provider>
    </>
  )
}

export default App
