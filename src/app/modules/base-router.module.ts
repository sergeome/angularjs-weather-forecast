import { NgModule } from '@angular/core';
import { RouterModule, Routes, UrlTree } from '@angular/router';
import { ForecastComponent } from '../views/forecast/forecast.component';
import { UrlHandlingStrategy } from '@angular/router';

const appRoutes: Routes = [
  {path: 'forecast', component: ForecastComponent},
  // {'path': 'signup', component: ''},
  // {'path': '404', component: ViewNoteFoundComponent}
  // {'path': '**', redirectTo: '/404'}
];

class CustomHandlingStrategy implements UrlHandlingStrategy {
  shouldProcessUrl(url: UrlTree): boolean {
    return url.toString().startsWith('/forecast') || url.toString() === '/';
  }

  extract(url: UrlTree): UrlTree {
    return url;
  }

  merge(newUrlPart: UrlTree, rawUrl: UrlTree): UrlTree {
    return newUrlPart;
  }
}

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  providers: [
    { provide: UrlHandlingStrategy, useClass: CustomHandlingStrategy }
  ],
  exports: [RouterModule]
})

export class BaseRouterModule  {}
