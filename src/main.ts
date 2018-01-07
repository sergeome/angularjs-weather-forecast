import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { ng1ForecastApp } from './ng1app';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import {setUpLocationSync} from '@angular/router/upgrade';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .then(ref => {
    const upgrade = (<any>ref.instance).upgrade;
    // bootstrap angular1
    upgrade.bootstrap(document.body, [ng1ForecastApp]);
    setUpLocationSync(upgrade);
  })
  .catch(err => console.log(err));
