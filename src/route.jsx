import { useLocation, useParams, useRoutes } from "react-router-dom";
import { lazy, Suspense } from 'react'

import Basic from "./layouts/Basic";
import PageLoader from "./components/PageLoader";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const WorkLog = lazy(() => import("./pages/WorkLog"));
const AddWorkLog = lazy(() => import("./pages/AddWorkLog"));
const UserWorkLog = lazy(() => import("./pages/UserWorkLog"));
const Project = lazy(() => import("./pages/Project"));


export default function Router() {
    const ROUTE = useRoutes([
        {
            path: '/',
            element:<Basic />,
            children: [
                { 
                    path: '/', 
                    element: <Suspense fallback={<PageLoader/>}>
                        <Dashboard /> 
                    </Suspense>
                },
                { 
                    path: '/worklog',
                    element: <Suspense fallback={<PageLoader/>}>
                        <WorkLog /> 
                    </Suspense>
                },
                { 
                    path: '/worklog/add/:id',
                    element: <Suspense fallback={<PageLoader/>}>
                        <AddWorkLog /> 
                    </Suspense>
                },
                { 
                    path: '/worklog/user/:id',
                    element: <Suspense fallback={<PageLoader/>}>
                        <UserWorkLog /> 
                    </Suspense>
                },
                { 
                    path: '/project',
                    element: <Suspense fallback={<PageLoader/>}>
                        <Project /> 
                    </Suspense>
                },
              ],
        },
        {
            path: '/login',
            element: <Suspense fallback={<PageLoader/>}>
                <Login />
            </Suspense>
        },
        {
            path: '/register',
            element: <Suspense fallback={<PageLoader/>}>
                <Register />
            </Suspense>
        },
    ])
    return ROUTE;
}