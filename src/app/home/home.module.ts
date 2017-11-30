import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { HomeAuthResolver } from './home-auth-resolver.service';
import { SharedModule } from '../shared';

export const route: ModuleWithProviders = RouterModule.forChild([
   {
     path: '',
     component: HomeComponent,
     resolve: {
       isAuthenticated: HomeAuthResolver
    }
   }
]);

@NgModule({
 imports: [
   route,
   SharedModule
 ],
 declarations: [
   HomeComponent
 ],
 providers: [
   HomeAuthResolver
 ]
})

export class HomeModule {}
