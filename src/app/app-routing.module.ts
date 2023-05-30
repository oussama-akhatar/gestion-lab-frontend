import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EtablissementComponent } from './components/etablissement/etablissement.component';
import {NewEtablissementComponent} from "./components/etablissement/new-etablissement/new-etablissement.component";

const routes: Routes = [
  { path: 'etablissement', component: EtablissementComponent },
  { path: 'addEtablissement', component: NewEtablissementComponent }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
