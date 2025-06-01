import { useContext, useEffect } from "react"
import { auth } from "../Firebase/firebase"
import Home from "./pages/Home/Home"
import Router from "./Router"
import { DataContext } from "./components/Context/Context"
import { Type } from "./Utility/action.type"

function App() {
 
  const [{user}, dispatch] = useContext(DataContext)

  useEffect(()=>{

    auth.onAuthStateChanged( ()=>{
      if(user){
        dispatch({
          type: Type.SET_USER,
          user: user,
        })
      } else {
        dispatch({
          type: Type.SET_USER,
          user: null,
        })
      }
    })
  }, [])
  return (
    <Router />
  )
}

export default App