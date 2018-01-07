import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

// Modules
import { BaseRouterModule } from './modules/base-router.module';
import { ForecastComponent } from './views/forecast/forecast.component';
import { ForecastItemComponent } from './components/forecast-item/forecast-item.component';
import { HomeComponent } from './views/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    ForecastComponent,
    ForecastItemComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BaseRouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {}
}
