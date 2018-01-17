import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { IframeComponent } from './migration/iframe/iframe.component';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  {path: '**', component: IframeComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    IframeComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
