import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

// Modules
import { UpgradeModule } from '@angular/upgrade/static';
import { BaseRouterModule } from './modules/base-router.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    UpgradeModule,
    BaseRouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
