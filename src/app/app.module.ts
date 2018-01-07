import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

// Modules
import { BaseRouterModule } from './modules/base-router.module';
import { ForecastComponent } from './views/forecast/forecast.component';
import { ForecastItemComponent } from './components/forecast-item/forecast-item.component';
import { HomeComponent } from './views/home/home.component';

import { ng1ForecastApp } from '../ng1app';
import { UpgradeModule } from '@angular/upgrade/static';

@NgModule({
  declarations: [
    AppComponent,
    ForecastComponent,
    ForecastItemComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BaseRouterModule,
    UpgradeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private upgrade: UpgradeModule) {}

  public ng1ForecastApp = ng1ForecastApp;

  ngDoBootstrap() {
    this.upgrade.bootstrap(document.body, ['ng1ForecastApp']);
  }
}
