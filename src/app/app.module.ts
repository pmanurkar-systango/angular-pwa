import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ImagesDemoComponent } from './images-demo/images-demo.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [{
  path: 'users',
  component: UsersComponent
}, {
  path: 'images-demo',
  component: ImagesDemoComponent
}, {
  path: '',
  redirectTo: '/images-demo',
  pathMatch: 'full'
}, {
  path: '**',
  redirectTo: '/images-demo',
  pathMatch: 'full'
}];

@NgModule({
  declarations: [
    AppComponent,
    ImagesDemoComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
