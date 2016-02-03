import React from 'react'
import { Route, IndexRedirect } from 'react-router'

import { LayoutContainer } from 'layouts/Layout'
import { DashboardContainer } from 'views/Dashboard'
import { TeamContainer } from 'views/Team'
import { UserContainer } from 'views/User'

const getRoutes = (store) => (
    <Route path="/" component={ LayoutContainer }>
        <Route path="dashboard" component={ DashboardContainer } />
        <Route path="teams/:teamId" component={ TeamContainer } />
        <Route path="user/:userId" component={ UserContainer } />
        <IndexRedirect to="dashboard" />
    </Route>
)

export default getRoutes;
