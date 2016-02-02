import React from 'react'
import { Route, IndexRedirect } from 'react-router'

import Layout from 'layouts/Layout'
import { DashboardContainer } from 'views/Dashboard'
import { TeamContainer } from 'views/Team'

const getRoutes = (store) => (
    <Route path="/" component={ Layout }>
        <Route path="dashboard" component={ DashboardContainer } />
        <Route path="teams/:teamId" component={ TeamContainer } />
        <IndexRedirect to="dashboard" />
    </Route>
)

export default getRoutes;
