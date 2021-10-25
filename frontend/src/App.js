import { useEffect, createContext, useReducer,useContext } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import Home from "./components/screens/Home";
import Signup from "./components/screens/Signup";
import Login from "./components/screens/Login";
import Profile from "./components/screens/Profile";
import CreatePost from "./components/screens/CreatePost";
import { reducer, initialState } from "./reducer/userReducer";

export const UserContext = createContext()


const Routing = () => {
  const history = useHistory()
  const {state,dispatch}=useContext(UserContext)
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    // console.log(user)
    if (user) {
    dispatch({ type:"USER",payload: user})
      history.push('/')
    }
    else {
      history.push('/login')
    }
  }, [])

  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>

      <Route path="/signin">
        <Signup />
      </Route>

      <Route path="/login">
        <Login />
      </Route>

      <Route path="/profile">
        <Profile />
      </Route>

      <Route path="/create">
        <CreatePost />
      </Route>
    </Switch>
  )
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Navbar />
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>

  );
}

export default App;
