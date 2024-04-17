import React from 'react'
import DashboardBook from '../components/DashboardBook'
import AddBook from '../components/AddBook'
import EditBook from '../components/EditBook'
import DashboardAuthor from '../components/DashboardAuthor'
import AddAuthor from '../components/AddAuthor'
import EditAuthor from '../components/EditAuthor'

import { Navigate } from 'react-router-dom'

const AppRoutes = [
    {
        path : '/',
        element : <DashboardBook/>,
        exact:true
    },
    {
        path : '/add-book',
        element : <AddBook/>,
        exact:true
    },
    {
        path : '/edit-book/:id',
        element : <EditBook/>,
        exact:true
    },
    {
        path : '/dashboard-author',
        element : <DashboardAuthor/>,
        exact:true
    },
    {
        path : '/add-author',
        element : <AddAuthor/>,
        exact:true
    },
    {
        path : '/edit-author/:id',
        element : <EditAuthor/>,
        exact:true
    },
    {
        path : '*',
        element : <Navigate to='/' />,
        exact:false
    }
]

export default AppRoutes;