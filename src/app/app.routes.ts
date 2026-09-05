import { Routes } from '@angular/router';

import { DashboardComponent } from './features/dashboard/dashboard.component';
import { DevicesComponent } from './features/devices/devices.component';
import { CommandsComponent } from './features/commands/commands.component';
import { ActivityComponent } from './features/activity/activity.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'devices',
    component: DevicesComponent,
  },
  {
    path: 'commands',
    component: CommandsComponent,
  },
  {
    path: 'activity',
    component: ActivityComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];