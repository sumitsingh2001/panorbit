import React from 'react'
import { Routes as DomRoutes, Route } from 'react-router-dom'
import Dashboard from '../components/dashboard';
import Home from '../components/home';
import { APP_ROUTES } from './RoutePaths';

const Routes = () => {
  return (
    <DomRoutes>
      <Route path={APP_ROUTES.ROOT} element={<Home />} />
      <Route path='/dashboard' element={<Dashboard />} />
    </DomRoutes>
  );
}

export default Routes