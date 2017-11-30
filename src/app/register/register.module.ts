import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RegisterComponent } from './register.component';
import { SharedModule } from '../shared';

export const route: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'signup',
    component: RegisterComponent
  }
]);

@NgModule({
  imports: [
    route,
    SharedModule
  ],
  declarations: [
    RegisterComponent
  ],
  providers: []
})
export class RegisterModule {

}
