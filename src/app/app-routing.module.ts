import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResourcesComponent } from './components/resources/resources.component';
import { SomePageComponent } from './components/some-page/some-page.component';
import { NotificationComponent } from './components/notification/notification.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/resources',
    pathMatch: 'full'
  },
  {
    path: 'resources',
    component: ResourcesComponent
  },

  {
    path: 'some',
    component: SomePageComponent
  },
  {
    path: 'notify',
    component: NotificationComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
