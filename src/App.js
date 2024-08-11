 import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
 
import Register from './Components/Register/Register';
import Layout from './Components/Layout/Layout';
import Login from './Components/Login/Login';
import Home from './Components/Home/Home';
import NotFound from './Components/NotFound/NotFound';
 
const myRouter=createBrowserRouter([
  {path:"/",element:<Layout/>,children:[
    {path:'register',element:<Register/>}, 
    {path:'login',element:<Login/>},
    {path:'home',element:<Home/>},
    {path:'*',element:<NotFound/>},
  ]}
])
function App() {
  return <>
   <RouterProvider router={myRouter}/>
    </>
}

export default App;
// 1-Create main components (Register , Login  , )
//2- Download main Packages
//3- Handling Routing Concept