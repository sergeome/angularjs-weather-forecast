import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  // {'path': '', component: ''},
  // {'path': 'signup', component: ''},
  // {'path': '404', component: ViewNoteFoundComponent}
  // {'path': '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class BaseRouterModule {}