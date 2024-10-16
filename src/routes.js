import React from 'react';
import MainDashboard from 'views/admin/default';

import {
  MdHome,
} from 'react-icons/md';

import { helloWorld } from 'hooks/welcome';

helloWorld();

const routes = [
  {
    name: 'Main Dashboard',
    layout: '/',
    path: 'default',
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
];

export default routes;
