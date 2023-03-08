import * as React from "react";
import * as ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import {
  createBrowserRouter, Redirect,
  RouterProvider,Switch
} from "react-router-dom";
import { Navigate } from 'react-router-dom';
import RootLayout from "./pages/RootLayout";
import HomePage from "./pages/HomePage";
import Register from "./pages/Register";
import {useEffect, useState} from "react";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Games from "./pages/Games";
import MyGames from "./pages/MyGames";
import Spinning from "./pages/Spinning";
import Spinner from "./pages/Spinner";
import CompletedGames from "./pages/CompletedGames";

function App() {
  const [ token, setToken] = useState(null);

  useEffect(()=>{
    setToken(localStorage.getItem('token'))
  },[])
  const Router=createBrowserRouter([
    {
      path:'/dashboard',
      element:token !== null ? <RootLayout/> :<Navigate to={'/login'}/>,
      children:[
        {path:'', element:<Dashboard/>},
        {path:'profile', element:<Profile/>},
        {path:'games', element:<Games/>},
        {path:'my-games', element:<MyGames/>},
        {path:'game/:id', element:<Spinner/>},
        {path:'completed-games', element:<CompletedGames/>},
      ]
    },
    {path:'/', element:<HomePage/>},
    {path:'/register', element:token == null? <Register/> : <Navigate to={'/dashboard'}/> },
    {path:'/login', element:token == null? <Login/> : <Navigate to={'/dashboard'}/>},
  ]);
  return  <RouterProvider router={Router}/>;
  // return  token !== null ? <RouterProvider router={Router}/> : <Dashboard/>;

}

export default App;
