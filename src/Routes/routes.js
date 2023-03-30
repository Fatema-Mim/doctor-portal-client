import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../Layout/DashboardLayout";
import Main from "../Layout/Main";
import About from "../Pages/About/About";
import Appointment from "../Pages/Appointment/Appointment/Appointment";
import AddDoctor from "../Pages/Dashboard/AddDoctor/AddDoctor";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import ManageDoctors from "../Pages/Dashboard/ManageDoctors/ManageDoctors";
import MyAppointment from "../Pages/Dashboard/MyAppoinment/MyAppoinment";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Signup from "../Pages/Signup/Signup";
import AdminRoute from "./AdminRoute";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
    {
        path:'/',
        element:<Main/>,
        children:[
            {
                path:'/',
                element:<Home/>
            },{
                path:'/appointment',
                element:<PrivateRoute><Appointment/></PrivateRoute>
            },{
            },{
                path:'/about',
                element:<About/>
            },
            
            {
                path:'/login',
                element: <Login/>
            }
            ,{
                path:'/signup',
                element: <Signup/>
            }
        ]
    },{
        path:'/dashboard',
        element:<PrivateRoute><DashboardLayout/></PrivateRoute>,
        children:[
            {
                path:'/dashboard',
                element:<MyAppointment/>
            },
            {
                path:'/dashboard/allusers',
                element:<AdminRoute>
                    <AllUsers/>
                </AdminRoute>
            },
            {
                path:'/dashboard/adddoctor',
                element:<AdminRoute>
                    <AddDoctor/>
                </AdminRoute>
            },{
                path:'/dashboard/managedoctors',
                element:<AdminRoute>
                    <ManageDoctors/>
                </AdminRoute>
            },
        ]
    }
])