import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmDetailsComponent } from './components/confirm-details/confirm-details.component';

import {HomeComponent} from './components/home/home.component';
import { ReportComponent } from './components/report/report.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'confirm-details',
    component: ConfirmDetailsComponent
  },
  {
    path: 'report',
    component: ReportComponent
  },
  {
      path: '',
      redirectTo: 'home',
      pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
  export class AppRoutingModule { }
