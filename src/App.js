import * as React from "react";
import * as ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
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

function App() {
  const [ token, setToken] = useState(null);
  useEffect(()=>{
    setToken(localStorage.getItem('token'))
  },[])
  const Router=createBrowserRouter([
    {
      path:'/dashboard',
      element:<RootLayout/>,
      children:[
        {path:'/dashboard', element:<Dashboard/>},
        {path:'/dashboard/profile', element:<Profile/>},
        {path:'/dashboard/games', element:<Games/>},
        {path:'/dashboard/my-games', element:<MyGames/>},
        {path:'/dashboard/game/:id', element:<Spinner/>},
      ]
    },
    {path:'/', element:<HomePage/>},
    {path:'/register', element:<Register/>},
    {path:'/login', element:<Login/>},
  ]);
  return  <RouterProvider router={Router}/>;
  // return  token !== null ? <RouterProvider router={Router}/> : <Dashboard/>;
}

export default App;
