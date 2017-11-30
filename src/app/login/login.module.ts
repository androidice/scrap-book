import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LoginComponent }  from './login.component';
import { SharedModule } from '../shared';

export const route: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'login',
    component: LoginComponent
  }
])

@NgModule({
  imports: [
    route,
    SharedModule
  ],
  declarations: [
    LoginComponent
  ],
  providers: []
})
export class LoginModule {

}
