import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EtablissementComponent } from './components/etablissement/etablissement.component';

const routes: Routes = [
  { path: 'etablissement', component: EtablissementComponent }
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
