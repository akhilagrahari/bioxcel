import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {path : '', component : DashboardComponent},
  {path : 'dashboard', component : DashboardComponent}
];

export const routing = RouterModule.forRoot(routes);
